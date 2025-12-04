# Portainer Deployment Guide

## Quick Deploy to Portainer

### Method 1: Using Portainer Stacks (Recommended)

1. **In Portainer**, navigate to:
   - **Stacks** → **Add Stack**

2. **Configure the stack**:
   - **Name**: `freezer-manager`
   - **Build method**: Select **Repository**
   - **Repository URL**: `https://github.com/charles-trotman/freezer-manager`
   - **Repository reference**: `refs/heads/main`
   - **Compose path**: `docker-compose.yml`
   - **Authentication**: Leave blank (public repo)

3. **Advanced settings** (optional):
   - If you want to change the port, scroll down to **Environment variables** and add:
     - Name: `PORT`
     - Value: `8080` (or your preferred port)

4. **Deploy**:
   - Click **Deploy the stack**
   - Wait for the build to complete (this may take a few minutes)

5. **Access your app**:
   - Open `http://YOUR_SERVER_IP:8080`

### Method 2: Using Web Editor

If the repository method fails, use the web editor:

1. **In Portainer**: **Stacks** → **Add Stack**
2. **Name**: `freezer-manager`
3. **Build method**: **Web editor**
4. **Paste this**:

```yaml
version: '3.8'

services:
  freezer-manager:
    container_name: freezer-manager
    image: ghcr.io/charles-trotman/freezer-manager:latest
    ports:
      - "8080:80"
    volumes:
      - freezer-data:/app/data
    environment:
      - NODE_ENV=production
    restart: unless-stopped

volumes:
  freezer-data:
    driver: local
```

5. Click **Deploy the stack**

> **Note**: For Method 2, you'll need to build and push the image to GitHub Container Registry first (see below).

## Troubleshooting

### If you get BuildKit errors:

1. **Disable BuildKit** in Portainer:
   - Go to **Environments** → Select your environment
   - Scroll to **Features configuration**
   - Toggle OFF: "Use BuildKit to build images"
   - Save changes

2. **Try deploying again**

### Alternative: Build and Push to GitHub Container Registry

If Portainer still has issues building from source:

```bash
# On your local machine or server with Docker
docker build -t ghcr.io/charles-trotman/freezer-manager:latest .
docker login ghcr.io -u charles-trotman
docker push ghcr.io/charles-trotman/freezer-manager:latest
```

Then use Method 2 above with the pre-built image.

## Managing Your Deployment

### View Logs
In Portainer:
- Go to **Containers** → Click on `freezer-manager`
- Click **Logs** to see application output

### Update the Application
1. Push changes to GitHub
2. In Portainer, go to your stack
3. Click **Pull and redeploy**

### Backup Data
Your data is stored in the `freezer-data` volume. To backup:

```bash
docker run --rm -v freezer-manager_freezer-data:/data -v $(pwd):/backup alpine tar czf /backup/freezer-data-backup.tar.gz -C /data .
```

### Change Port
Edit the stack and change `"8080:80"` to `"YOUR_PORT:80"`

## Default Configuration

- **Port**: 8080 (external) → 80 (internal)
- **Data Volume**: `freezer-data` (persists across restarts)
- **Restart Policy**: `unless-stopped` (auto-restart on failure)
