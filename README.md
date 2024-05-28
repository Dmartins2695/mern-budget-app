Setup kubernetes
        Download lens and docker desktop
            Enable kubernetes on desktop
            find your kube config at ~/.kube/config on macOS/Linux or %USERPROFILE%\.kube\config on Windows
        Since your cluster is not running yet you need to containerize you app so run this command on the 
            backend folder:   docker build -t mbewd/mern-budget-backend:latest .
            frontend folder:   docker build -t mern-budget-frontend:latest .
        Verify your images on docker desktop make sure they exist
        if they exist now we are going to deploy the manifests
        to do that we gonna run the command
            backend folder:  kubectl apply -f backend-deployment.yaml
                             kubectl apply -f backend-service.yaml
                             kubectl apply -f mongo-deployment.yaml
                             kubectl apply -f mongo-service.yaml
            frontend folder: kubectl apply -f frontend-deployment.yaml
                             kubectl apply -f frontend-service.yaml
        Ensure everything is okay with this commands
                kubectl get deployments
                kubectl get services
        You will have pods running but the app is not yet running because the docker images are not in you docker hub so lets push the images first and then kubernetes will be able to pull them
            docker push mbewd/mern-budget-backend:latest
            kubectl set image deployment/mern-budget-backend backend=mbewd/mern-budget-backend:latest -n mern-budget

            docker push mbewd/mern-budget-frontend:latest
            kubectl set image deployment/mern-budget-frontend backend=mbewd/mern-budget-frontend:latest -n mern-budget

        Now you cluster should have your pods running
        URI for the database will be mongodb://localhost:27017/
        you can access the apis on the backend with http://localhost:4000

        

           