# Pao mobile

React native mobile app for my ev pao conversion. Simple design to display car information transmitted via bluetooth. 


# Installation

## Prerequisites
### adb
 
Windows:>PS> iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/corbindavenport/nexus-tools/main/install.ps1'))
MAC:  brew install android-platform-tools


### npm 

https://nodejs.org/en/download

### yarn 

npm install --global yarn

NOTE: on windeos if seeing ```yarn.ps1 cannot be loaded because running scripts is disabled on this system``` visit [this Blog.](https://bobbyhadz.com/blog/yarn-cannot-be-loaded-running-scripts-disabled))

## Steps

```$ yarn install```

```$ yarn start```



# Compatibility
designed to work with the ev pao charger controller and the eve pao evcu controller can be found below:
[Charger](https://github.com/vkorotchenko/pao_charger)
[EVCU](https://github.com/vkorotchenko/EVCU6)
//TODO change to my own repo

|Mobile| Charger | EVCU|
|--|--|--|
| .9 |.9  |.9

