#!/bin/sh
if [ $# -eq 0 ]
  then
    echo "Argument 1 : nom du plugin"
    echo "Argument 2 : version à déployer"
    exit
fi


zip build/last/$1.zip index.html LICENCE *$1*.*
cp build/last/$1.zip build/$2/$1.zip

echo "Fichiers déployés"