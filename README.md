
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<img width="100%" src="https://user-images.githubusercontent.com/61355143/188564647-65333a60-b79f-4ab9-8212-16c08254336b.png">


to develop systems that determine which server to use according to the amount of submissions made. to convince customers of this on the corporate side and to advance the project.


### Technologies and Methods

- Node.Js
- Python
- MongoDB
- MySQL
- RabbitMQ
- Asynchronous Programming
- Multi Threading
- JWT Token
- Typer
- Sklearn
- Rich Table
- CSV Files
- Slack Integration
- Discord Integration
- Jester - Super test
- Winston
- Powershell Scripts


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started



### Installation


1. Clone the repo
   ```sh
   https://github.com/BerkayKulak/AIOPS.git
   ```
2. Update and Download npm packages
   ```sh
   npm install
   npm update [-g] [<pkg>...]
   ```
3. Add MySQL connection
   ```js
   hostname:127.0.0.1
   port:3306
   ```
4. Add Python packages
   ```js
   pip download <packagename> <options>
   ```
5. RabbitMQ docker
   ```js
   docker pull rabbitmq
   docker run -d --hostname my-rabbit --name some-rabbit rabbitmq:3
   ```
   

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage


```bash - 1
# Go into the AiOpsBackend
$ cd \AiOpsBackend

# Run the app
$ npm run start


```bash - 2
# Go into the AiOps
$ cd \AiOps

# scripts
$ choices = [System.Management.Automation.Host.ChoiceDescription[]] @("&Y","&N") 
$ headers = @{
 'Content-Type'='application/json'
 }
$ while ( $true ) {
  Invoke-WebRequest -Method 'Post' -Uri 127.0.0.1:3000/api/v1/usageOfServer/sphToPython -Headers $headers -ContentType "application/json"
  $choice = $Host.UI.PromptForChoice("Repeat the script?","",$choices,0)
  if ( $choice -ne 0 ) {
    break
  }
} 


```bash - 3
# Go into the AiOpsBackend
$ cd \AiOpsBackend

# Run the live logs
$ Get-Content info.log -wait 



```bash - 4
# Go into the AiOps
$ cd \AiOps

# Run the prediction
$ python aiops.py prediction


```

<!-- USAGE EXAMPLES -->
## Config
```
NODE_ENV=development
PORT=3000
DATABASE = [DATABASE ADDRESS]
DATABASE_LOCAL=[LOCAL DATABASE]
DATABASE_PASSWORD=[DATABASE PASSWORD]


```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Bug / Feature Request

If you find a bug (the website couldn't handle the query and / or gave undesired results), kindly open an issue [here](https://github.com/BerkayKulak/AIOPS/issues/new) by including your search query and the expected result.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/BerkayKulak/AIOPS/issues/new). Please include sample queries and their corresponding results.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact
Hasan Ayberk Aydemir - (https://www.linkedin.com/in/aydemirayberk/) - ayberkaydemir8901@gmail.com
Berkay Kulak - (https://www.linkedin.com/in/berkay-kulak-3442311b1/) - kulakberkay15@gmail.com

Project Link:   (https://github.com/BerkayKulak/AIOPS)

<p align="right">(<a href="#top">back to top</a>)</p>
