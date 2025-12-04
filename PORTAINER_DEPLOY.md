# Quick Portainer Deployment Fix

## The Problem
Portainer can't build from GitHub due to BuildKit communication errors.

## The Solution
Use GitHub Actions to automatically build the Docker image, then have Portainer pull the pre-built image.

## Steps to Deploy

### 1. Push Changes to GitHub

```bash
git add .
git commit -m "Add GitHub Actions for Docker builds"
git push
```

### 2. Wait for GitHub Actions to Build

- Go to your repo: https://github.com/charles-trotman/freezer-manager
- Click on **Actions** tab
- Wait for the "Build and Push Docker Image" workflow to complete (2-3 minutes)
- The image will be published to `ghcr.io/charles-trotman/freezer-manager:latest`

### 3. Make the Image Public (One-time setup)

- Go to https://github.com/charles-trotman?tab=packages
- Click on **freezer-manager** package
- Click **Package settings** (right side)
- Scroll down to **Danger Zone**
- Click **Change visibility** → **Public**
- Confirm

### 4. Deploy in Portainer

**Option A: Using Stacks (Recommended)**

1. In Portainer: **Stacks** → **Add Stack**
2. Name: `freezer-manager`
3. Build method: **Repository**
4. Repository URL: `https://github.com/charles-trotman/freezer-manager`
5. Compose path: `docker-compose.yml`
6. Click **Deploy the stack**

**Option B: Using Web Editor**

1. In Portainer: **Stacks** → **Add Stack**
2. Name: `freezer-manager`
3. Build method: **Web editor**
4. Paste this:

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
    pull_policy: always

volumes:
  freezer-data:
    driver: local
```

5. Click **Deploy the stack**

### 5. Access Your App

Open: `http://YOUR_SERVER_IP:8080`

## How It Works

1. **GitHub Actions** automatically builds the Docker image when you push to `main`
2. The image is pushed to **GitHub Container Registry** (ghcr.io)
3. **Portainer** pulls the pre-built image (no building required!)
4. Your app runs in a container

## Updating the App

1. Make changes to your code
2. Push to GitHub: `git push`
3. GitHub Actions automatically builds a new image
4. In Portainer, go to your stack and click **Pull and redeploy**

## Troubleshooting

**If the image pull fails:**
- Make sure you made the package public (Step 3)
- Check that GitHub Actions completed successfully

**If you want to use a private image:**
- In Portainer, go to **Registries** → **Add Registry**
- Type: **Custom Registry**
- Registry URL: `ghcr.io`
- Username: `charles-trotman`
- Password: Your GitHub Personal Access Token (with `read:packages` permission)

That's it! No more BuildKit errors! 🎉
