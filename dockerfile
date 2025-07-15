# Stage 1 :build base

FROM node:18-alpine

# Set working directory
WORKDIR /

#Copy package files
COPY package*.json ./

#Install deps
RUN npm install 

# Copy rest of app
COPY . .

# Expose backend port 
EXPOSE 5000

# Start app
CMD ["npm","start"]