# Atlas Redesign

Atlas is a service which lets students search for internships offered in Greece. The project was to evaluate the [current live application](https://atlas.grnet.gr/) and then provide a better one based on the evaluation errors we found.

The project was team based and the backend services were developed by [Sapemeg](https://github.com/Sapemeg) while the frontend part of the application was developed by myself.

This project is part of the Human Computer Interaction course in the [Department of Informatics and Telecommunications](https://www.di.uoa.gr/en) at the [University of Athens](https://www.uoa.gr/).

## Installation

In order to run the preview of the application you need to have **Docker** installed. If you don't have it, you can follow the instructions below to install it.

### For testing in Windows

0. First you need to install [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install), so make sure that you got this set up first.

1. For the desktop application of Docker:

- Navigate to the [Docker Desktop installation page](https://docs.docker.com/desktop/install/windows-install/) and download the executable.
  - Follow the on-screen instructions of the installer and make sure to check the **Use WSL 2 instead of Hyper-V** option.

2. For Docker Engine installation:

- Make sure that you have installed the Ubuntu on Windows from the [Microsoft Store](https://apps.microsoft.com/store/detail/ubuntu-on-windows/9NBLGGH4MSV6?hl=).
- Navigate to the [Docker Engine installation page](https://docs.docker.com/engine/install/ubuntu/) and follow the instructions to download and install the Docker Engine on WSL.

3. After the installation is complete:

- Open Docker Desktop
- Open Ubuntu on Windows
- Clone this repository in whatever directory you want inside the WSL image of Ubuntu.
- Navigate to the root directory of the project, this directory should only contain two sub-directories and the docker compose file.
- Run the command:
- `docker compose up` or `docker-compose up`
- If your user is a non-root user you need to run this command with **sudo** or you can follow the guide on [how to manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/) to resolve this issue.

### For testing in Linux

To test this application in a linux distribution you can simply install the [Docker Engine](https://docs.docker.com/engine/) and then follow the same step as described above to run the application.

- A list of installation instructions depending on your distro:
  - [CentOS](https://docs.docker.com/engine/install/centos/)
  - [Debian Based](https://docs.docker.com/engine/install/debian/)
  - [Fedora](https://docs.docker.com/engine/install/fedora/)
  - [RHEL](https://docs.docker.com/engine/install/rhel/)
  - [SLES](https://docs.docker.com/engine/install/sles/)
  - [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- Make sure to check out the post installation step you should do.
- After the installation is complete all you need to do to run the application is to navigate to the root directory and run the command `docker compose up` or `docker-compose up`
- If your user is a non-root user you need to run this command with **sudo** or you can follow the guide on [how to manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/) to resolve this issue.

### For testing in MacOS

In order to run the application in MacOS you have to install [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/). Follow the instructions provided in the installation page and then to run the application all you have to do is run the command `docker compose up`.
