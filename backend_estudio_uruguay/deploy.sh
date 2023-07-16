echo "switching to master branch"
git checkout master

echo "bulding app..."
npm run build

echo "Deploying app into server..."
scp -P 2222  -r build/* rodrigo@179.27.152.244:/var/www/179.27.152.244/

echo "Done"