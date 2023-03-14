# Atlas Redesign

Atlas is a service which lets students search for internships offered in Greece. The project was to evaluate the <a href="https://atlas.grnet.gr/" target="_blank">current live application</a> and then provide a better one based on the evaluation errors we found.
<a href="" target="_blank"></a>
The project was team based and the backend services were developed by <a href="https://github.com/Sapemeg" target="_blank">Sapemeg</a> while the frontend part of the application was developed by myself.

This project is part of the Human Computer Interaction course in the <a href="https://www.di.uoa.gr/en" target="_blank">Department of Informatics and Telecommunications</a> at the <a href="https://www.uoa.gr/" target="_blank">University of Athens</a>.

## Installation

In order to run the preview of the application you need to have **Docker** installed. If you don't have it, you can follow the instructions below to install it.

### For testing in Windows

1. First you need to install <a href="https://learn.microsoft.com/en-us/windows/wsl/install" target="_blank">WSL 2</a>, so make sure that you got this set up first.

2. For the desktop application of Docker:

- Navigate to the <a href="https://docs.docker.com/desktop/install/windows-install/" target="_blank">Docker Desktop installation page</a> and download the executable.
  - Follow the on-screen instructions of the installer and make sure to check the **Use WSL 2 instead of Hyper-V** option.

1. For Docker Engine installation:

- Make sure that you have installed the Ubuntu on Windows from the <a href="https://apps.microsoft.com/store/detail/ubuntu-on-windows/9NBLGGH4MSV6?hl=" target="_blank">Microsoft Store</a>.
- Navigate to the <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank">Docker Engine installation page</a> and follow the instructions to download and install the Docker Engine on WSL.

1. After the installation is complete:

- Open Docker Desktop
- Open Ubuntu on Windows
- Clone this repository in whatever directory you want inside the WSL image of Ubuntu.
- Navigate to the root directory of the project, this directory should only contain two sub-directories and the docker compose file.
- Run the command:
- `docker compose up` or `docker-compose up`
- If your user is a non-root user you need to run this command with **sudo** or you can follow the guide on <a href="https://docs.docker.com/engine/install/linux-postinstall/" target="_blank">how to manage Docker as a non-root user</a> to resolve this issue.
- When the installation phase of the application stops the application should run on <a href="http://localhost:4200" target="_blank">localhost:4200</a>.

### For testing in Linux

To test this application in a linux distribution you can simply install the <a href="https://docs.docker.com/engine/" target="_blank">Docker Engine</a> and then follow the same step as described above to run the application.

- A list of installation instructions depending on your distro:
  - <a href="https://docs.docker.com/engine/install/centos/" target="_blank">CentOS</a>
  - <a href="https://docs.docker.com/engine/install/debian/" target="_blank">Debian Based</a>
  - <a href="https://docs.docker.com/engine/install/fedora/" target="_blank">Fedora</a>
  - <a href="https://docs.docker.com/engine/install/rhel/" target="_blank">RHEL</a>
  - <a href="https://docs.docker.com/engine/install/sles/" target="_blank">SLES</a>
  - <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank">Ubuntu</a>
- Make sure to check out the post installation step you should do.
- After the installation is complete all you need to do to run the application is to navigate to the root directory and run the command `docker compose up` or `docker-compose up`
- If your user is a non-root user you need to run this command with **sudo** or you can follow the guide on <a href="https://docs.docker.com/engine/install/linux-postinstall/" target="_blank">how to manage Docker as a non-root user</a> to resolve this issue.
- When the installation phase of the application stops the application should run on <a href="http://localhost:4200" target="_blank">localhost:4200</a>.

### For testing in MacOS

In order to run the application in MacOS you have to install <a href="https://docs.docker.com/desktop/install/mac-install/" target="_blank">Docker Desktop for Mac</a>. Follow the instructions provided in the installation page and then to run the application all you have to do is run the command `docker compose up`. When the installation phase of the application stops the application should run on <a href="http://localhost:4200" target="_blank">localhost:4200</a>.
