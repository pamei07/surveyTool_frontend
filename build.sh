#!/usr/bin/env bash

echo "Building Angular app for $FRONTEND_ENV"

build_dev='ng build --configuration=staging'
if [ $FRONTEND_ENV = "staging" ]; then
 echo "running $build_dev ..."
 eval "$build_dev"
fi

build_prod='ng build --configuration=production'
if [ $FRONTEND_ENV = "production" ]; then
 echo "running $build_prod ..."
 eval "$build_prod"
fi
