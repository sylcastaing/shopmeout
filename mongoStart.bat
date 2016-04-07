set titre=Explorateur MongoDB (En ligne de commande)

taskkill /F /FI "WindowTitle eq %titre%" /T
title %titre%
cd "C:\Program Files\MongoDB\Server\3.2\bin\"
mongo.exe shopmeout