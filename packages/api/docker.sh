#!/usr/bin/env bash

IMAGE_NAME=lcm-api
HOST_PORT=3000

err() {
    echo $* >&2
}

usage() {
    err "$(basename $0): [build|run|all|login]"
}

clean() {
    IMAGE=$(docker ps -a -q --filter ancestor=${IMAGE_NAME} --format="{{.ID}}")

    if ! test -z "$IMAGE"
    then
        docker rm $(docker stop ${IMAGE})
        docker rmi -f ${IMAGE_NAME}
    fi
}

build_docker() {
    docker build -t ${IMAGE_NAME} .
}

launch() {
    docker run -p ${HOST_PORT}:3000 -d ${IMAGE_NAME}
}

execute() {
    local task=${1}
    case ${task} in
        build)
            clean
            build_docker
            ;;
        run)
            launch
            ;;
        all) // Hàm để thực hiện clean, build và chạy docker
            clean
            build_docker
            launch
            ;;
        *)
            err "invalid task: ${task}"
            usage
            exit 1
            ;;
    esac
}

main() {
    [ $# -ne 1 ] && { usage; exit 1; }
    local task=${1}
    execute ${task}
}

main $@