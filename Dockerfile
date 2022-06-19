FROM node:16.13.2

RUN mkdir /nodecg
WORKDIR /nodecg

RUN npm install -g nodecg-cli && \
    nodecg setup

RUN nodecg install yagamuu/nodecg-speedcontrol

VOLUME [ "/nodecg/bundles", "/nodecg/cfg", "/nodecg/db", "/nodecg/logs" ]
EXPOSE 9090

CMD ["nodecg", "start"]