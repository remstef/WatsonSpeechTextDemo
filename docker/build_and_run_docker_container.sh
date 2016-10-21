#!/bin/sh

#
# stop on error
#
set -e

#
# get the directory name, just in case you call the script from another directory
#
DIR=$(dirname $0)

#
# the name of the target docker container is either provided as argument, or set by default to "watson_speechtext"
#
NAME=${1:-watson_speechtext}

#
# print some info
#
echo "building docker in $DIR as $NAME ..." 

#
# Enter credentials via stdin
#
echo "Enter speech-to-text username"
read sttuser
echo "Enter speech-to-text password"
read sttpass
echo "Enter text-to-speech username"
read ttsuser
echo "Enter text-to-speech password"
read ttspass

#
# build the Dockerfile in $DIR and pass the credentials as arguments, as required by the Dockerfile
#
docker build \
--build-arg sttuser="$sttuser" \
--build-arg sttpass="$sttpass" \
--build-arg ttsuser="$ttsuser" \
--build-arg ttspass="$ttspass" \
-t $NAME "$DIR" 

#
# print some info
#
echo "... successfully built docker in $DIR as $NAME" 
echo "starting docker $NAME ..." 

#
# check if a container with the name exists and if so,
# delete it, otherwise the run command will fail
#
docker ps -a | grep "${NAME}_instance" && docker rm -f ${NAME}_instance

#
# run the container as a daemon (-d) and publish the 
# container's exposed port 3000 to the local port 8080 (-p)
#
docker run -d -p 8080:3000 --name ${NAME}_instance $NAME

#
# print some more info
#
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
# run the container interactively and overwrite the entrypoint
# $ docker run -t -i --entrypoint bash ${NAME}
#
###
"
