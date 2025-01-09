#! /bin/bash

echo "Setting up the project"

# Detect OS for sed compatibility
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    SED_INPLACE="sed -i ''"
else
    # Linux and others
    SED_INPLACE="sed -i"
fi

# Ask for project name
read -p "Enter project name: " project_name

# Update package.json name
$SED_INPLACE "s/\"name\": \".*\"/\"name\": \"$project_name\"/" package.json

# Copy .env.example to .env
cp .env.example .env

# Generate random keys (32 characters)
api_key=$(openssl rand -base64 32)
encryption_key=$(openssl rand -base64 32)
jwt_secret=$(openssl rand -base64 32)
password_secret=$(openssl rand -base64 32)

# Update .env file with new values
$SED_INPLACE "s/APP_NAME=.*/APP_NAME=$project_name/" .env
$SED_INPLACE "s/API_KEY=.*/API_KEY=$api_key/" .env
$SED_INPLACE "s/ENCRYPTION_KEY=.*/ENCRYPTION_KEY=$encryption_key/" .env
$SED_INPLACE "s/JWT_SECRET=.*/JWT_SECRET=$jwt_secret/" .env
$SED_INPLACE "s/PASSWORD_SECRET=.*/PASSWORD_SECRET=$password_secret/" .env

# Install dependencies
npm install

# Remove git directory
rm -rf .git

rm -rf ".env''"
rm -rf "package.json''"

echo "✨ Project setup complete! ✨"
echo "Project '$project_name' has been configured with new security keys."

