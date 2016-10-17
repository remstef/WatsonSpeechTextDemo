#!/bin/sh
set -e

DIR=$(dirname $0)
NAME=${1:-watson_speechtext}

echo "building docker in $DIR as $NAME ..." 

echo "Enter speech-to-text username"
read sttuser
echo "Enter speech-to-text password"
read sttpass
echo "Enter text-to-speech username"
read ttsuser
echo "Enter text-to-speech password"
read ttspass

docker build \
--build-arg sttuser="$sttuser" \
--build-arg sttpass="$sttpass" \
--build-arg ttsuser="$ttsuser" \
--build-arg ttspass="$ttspass" \
-t $NAME "$DIR" 

echo "... successfully built docker in $DIR as $NAME" 

echo "starting docker $NAME ..." 

# check if a container with the same name exists and if so delete it
docker ps -a | grep "${NAME}_instance" && docker rm -f ${NAME}_instance

docker run -d -p 8080:3000 --name ${NAME}_instance $NAME

echo "... successfully started docker $NAME" 

echo "
###
#
# check running containers:
# $ docker ps
#
# check existing containers:
# $ docker ps -a
#
# check output of container:
# $ docker logs ${NAME}_instance
#
# stop container:
# $ docker stop ${NAME}_instance
#
# start existing container:
# $ docker start ${NAME}_instance
#
# run a bash command in a running container and connect to it:
# $ docker exec -i -t ${NAME}_instance bash
#
###
"
