#!/bin/bash

# Transcaspian Project Deployment Script (Updated - Backend included)
# This script will build and deploy Backend, Next.js and Admin applications using PM2

set -e

echo "🚀 Starting Transcaspian project deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_error "PM2 is not installed. Please install it first:"
    echo "npm install -g pm2"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install it first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install it first."
    exit 1
fi

# Create logs directory
mkdir -p logs

# Stop existing PM2 processes
print_status "Stopping existing PM2 processes..."
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Check if backend directory exists
if [ ! -d "./backend" ]; then
    print_warning "Backend directory not found. Please ensure backend is in ./backend/"
    print_warning "Backend should run on port 5014"
fi

# Install dependencies for Backend (if exists)
if [ -d "./backend" ]; then
    print_status "Installing dependencies for Backend..."
    cd backend
    npm ci --production=false
    print_status "Backend dependencies installed"
    cd ..
else
    print_warning "Backend directory not found. Skipping backend setup."
fi

# Install dependencies for Next.js app
print_status "Installing dependencies for Next.js app..."
cd TranscaspianNext
npm ci --production=false
print_status "Building Next.js app..."
npm run build
cd ..

# Client app removed - functionality integrated into Next.js app
print_status "Client app removed - functionality integrated into Next.js app..."

# Install dependencies for Admin app
print_status "Installing dependencies for Admin app..."
cd admin
npm ci --production=false
print_status "Building Admin app..."
npm run build
cd ..

# Start all applications with PM2
print_status "Starting applications with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
print_status "Saving PM2 configuration..."
pm2 save

# Setup PM2 startup script
print_status "Setting up PM2 startup script..."
pm2 startup

print_status "Deployment completed successfully! 🎉"
echo ""
echo "📊 PM2 Status:"
pm2 status
echo ""
echo "📝 Logs are available in the logs/ directory"
echo "🔧 To manage applications, use:"
echo "   pm2 status          - Check status"
echo "   pm2 logs            - View logs"
echo "   pm2 restart all     - Restart all apps"
echo "   pm2 stop all        - Stop all apps"
echo "   pm2 delete all      - Remove all apps"
echo ""
echo "🌐 Applications are running on:"
echo "   Backend API: http://localhost:5014"
echo "   Next.js:    http://localhost:3000"
echo "   Admin:      http://localhost:3001"
echo ""
echo "🌐 Production URLs:"
echo "   Main site:  https://transcaspiantours.com"
echo "   Admin:      https://transcaspiantours.com/admin/"
echo "   API:        https://transcaspiantours.com/api/"
echo ""
echo "💡 Note: Backend API runs on port 5014 and handles all /api/* requests"
echo "   Admin panel connects to backend through /api endpoints"
