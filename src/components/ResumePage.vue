<template>
  <div class="scene">
    <div class="device">
      <div class="mobile-top">
        <div class="mic"></div>
      </div>
      <div class="screen">
        <div class="scrollup"></div>
        <div class="scrollable">
          <header>
            <h1>
              <span>Paul Seale,&nbsp;</span><span>Software Developer</span>
            </h1>
          </header>
          <section>
            <h2>About</h2>
            <p>
              Software developer with over 20 years of experience. Attention to
              detail and quality while keeping things simple. Passionate about
              learning new technologies and skills. Interacts well with others
              by keeping things light and maintaining perspective.
            </p>
          </section>
          <section>
            <h2>Objective</h2>
            <p>
              To use and expand my knowledge of browser technologies in the role
              of front-end web developer. Interests include CSS, Typescript,
              HTML5, frameworks, cross-browser compatibility, web accessibility,
              and responsive design.
            </p>
          </section>
          <section>
            <h2>Education</h2>
            <p>
              Master of Science: Computer Science, Portland State University,
              1999.
            </p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>
              <a
                class="link"
                href="https://linkedin.com/in/paul-seale"
                target="_blank"
                ><img
                  src="@/assets/images/linkedin-logo.png"
                  alt="LinkedIn logo"
                />LinkedIn account</a
              >
            </p>
          </section>
          <section>
            <h2>Experience</h2>
            <article class="history">
              <ul class="title">
                <li>Application Developer</li>
                <li>July 2014 - Present</li>
                <li>L3Harris - Tempe, AZ</li>
              </ul>
              <ul class="duties">
                <li>Angular developer on MES web-based application</li>
                <li>
                  Uses Angular Material, Typescript, RxJS, CSS, HTML,
                  Express.js, Cypress
                </li>
                <li>
                  Works on Agile team with Bitbucket, Jira, Confluence and
                  Jenkins
                </li>
                <li>
                  Principal C++ and Korn shell script developer of shop floor
                  control system
                </li>
                <li>Develops SSIS packages and ETL processes for SQL Server</li>
              </ul>
            </article>
            <article class="history">
              <ul class="title">
                <li>Software Engineer</li>
                <li>October 2010 - March 2012</li>
                <li>PayPal - Scottsdale, AZ</li>
              </ul>
              <ul class="duties">
                <li>
                  Member of the merchant reporting and fraud prevention groups
                </li>
                <li>
                  Used SQL*Plus and PL/SQL on Oracle database for merchant
                  reports
                </li>
                <li>Implemented Actuate Reports in Visual Basic</li>
                <li>C++ developer on fraud prevention module</li>
              </ul>
            </article>
            <article class="history">
              <ul class="title">
                <li>Software Engineer</li>
                <li>February 2009 - October 2010</li>
                <li>Chamberlain Access Solutions - Scottdale, AZ</li>
              </ul>
              <ul class="duties">
                <li>
                  Developer on merchant credit card processing application
                </li>
                <li>
                  Implemented PCI (payment card industry) security compliance
                </li>
                <li>Manually generated UML documentation from source code</li>
                <li>Implemented debugger for Btrieve database</li>
                <li>
                  Implemented debugger for hardware controller used with
                  self-storage units
                </li>
                <li>Languages used: C++, C#</li>
              </ul>
            </article>
            <article class="history">
              <ul class="title">
                <li>Software Engineer</li>
                <li>March 2005 - October 2008</li>
                <li>Zaio - Scottdale, AZ</li>
              </ul>
              <ul class="duties">
                <li>
                  Principal developer on real estate appraisal management
                  desktop application
                </li>
                <li>
                  Implemented with C++ and Oracle PL/SQL stored procedures
                </li>
                <li>
                  Developed XML-based Windows services for real estate appraisal
                  transactions
                </li>
              </ul>
            </article>
            <article class="history">
              <ul class="title">
                <li>Compiler Engineer</li>
                <li>October 2000 - April 2004</li>
                <li>Microchip Technology - Chandler, AZ</li>
              </ul>
              <ul class="duties">
                <li>C++ developer in the language tools group</li>
                <li>
                  Worked on C compiler, assembler, and linker for 8-bit
                  microcontrollers
                </li>
                <li>
                  Implemented code generator to target 8-bit Harvard
                  architecture
                </li>
                <li>
                  Automated the release build process and wrote Wise Installer
                  scripts
                </li>
              </ul>
            </article>
            <article class="history">
              <ul class="title">
                <li>Programming Analyst</li>
                <li>May 1999 - October 2000</li>
                <li>NCS Pearson - Mesa, AZ</li>
              </ul>
              <ul class="duties">
                <li>
                  Developed C++ cross-platform desktop application for school
                  district administrations
                </li>
                <li>
                  Wrote requirements and design specifications for district
                  customizations
                </li>
              </ul>
            </article>
          </section>
        </div>
        <div class="scrolldown"></div>
      </div>
      <div class="mobile-bottom">
        <div class="button"></div>
        <div class="mouse"></div>
        <div class="button"></div>
      </div>
      <div class="keyboard"></div>
      <div class="front"></div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  height: 100%;
  font-size: 1vw;
}

body {
  height: 100%;
  background-color: burlywood;
  font-family: 'Arimo', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 4em;
  padding-bottom: 1em;
}

h1 {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

h2 {
  font-size: 3em;
}

p {
  font-size: 2em;
  padding-bottom: 0.5em;
  padding-left: 0.5em;
}

ul {
  font-size: 2em;
}

.history {
  padding: 1em 0.5em;
}

.title {
  font-weight: bold;
  list-style: none;
}

.duties {
  padding-left: 1.5em;
}

.link img {
  width: 2em;
  height: auto;
  vertical-align: bottom;
  margin-right: 0.5em;
}

@media (max-width: 480px) {
  h1 {
    font-size: 3em;
  }
  .scene {
    height: 95%;
  }
  .device {
    font-size: 2em;
    width: 80vw;
    height: 100%;
    padding-top: 0.5em;
    border: 2em solid black;
    border-radius: 6em;
    background-color: #333;
    display: flex;
    flex-flow: column nowrap;
  }
  .mobile-top {
    flex: 0 0 8%;
    display: flex;
    background-color: transparent;
    justify-content: center;
    align-items: center;
  }
  .mic {
    width: 20%;
    height: 1em;
    padding: 0.25em;
    border-radius: 0.5em;
    background-color: silver;
    background-image: linear-gradient(
      to right,
      transparent,
      black,
      transparent
    );
    background-origin: content-box;
    background-size: 10% 100%;
    background-position: center left;
    background-repeat: repeat-x;
  }
  .mobile-bottom {
    flex: 0 0 8%;
    display: flex;
    background-color: transparent;
    justify-content: space-around;
    align-items: center;
  }
  .button {
    width: 5%;
    height: 2em;
    border: 1px solid black;
    border-radius: 0.5em;
    background-color: #777;
  }
  .mouse {
    width: 20%;
    height: 3em;
    border: 0.3em solid #777;
    border-radius: 6em;
    background-color: black;
  }
  .screen {
    flex: 1 1 auto;
    background-color: #ddd;
    display: flex;
    flex-flow: column nowrap;
    overflow: hidden;
    padding: 1em;
  }
  .scrollable {
    box-sizing: content-box;
    width: 100%;
    padding-right: 4em;
    background-color: #ddd;
    overflow-y: scroll;
  }
  .history {
    padding-left: 0;
  }
}
@media (min-width: 481px) {
  .scene {
    flex: none;
    width: 96vw;
    height: calc(46vw + 2em);
    perspective: 100vw;
    position: relative;
  }
  .device {
    position: relative;
    bottom: 4%;
    width: 100%;
    height: calc(46vw + 2em);
    transform-style: preserve-3d;
    transform: translateZ(-46vw);
  }
  .mobile-top,
  .mobile-bottom {
    display: none;
  }
  .screen {
    position: absolute;
    bottom: 2em;
    width: 100%;
    height: 46vw;
    padding: 1em;
    padding-right: 4em;
    border: 2em solid #000;
    border-radius: 1em;
    background-color: #ddd;
    display: flex;
    flex-flow: column nowrap;
    overflow: hidden;
  }
  .scrollable {
    box-sizing: content-box;
    width: 100%;
    padding-right: 10em;
    overflow-y: scroll;
  }
  .scrollup {
    position: absolute;
    top: -2em;
    right: 0;
    width: 0;
    height: 0;
    border: 2em solid transparent;
    border-bottom: 2em solid black;
  }
  .scrolldown {
    position: absolute;
    bottom: -2em;
    right: 0;
    width: 0;
    height: 0;
    border: 2em solid transparent;
    border-top: 2em solid black;
  }
  .keyboard {
    position: absolute;
    top: 0;
    width: 100%;
    height: 45.7142857143vw;
    border: 3em solid black;
    border-bottom-width: 5em;
    border-radius: 0.3em;
    transform-origin: center bottom;
    transform: rotateX(90deg) translateY(calc(46vw + 0.125em));
    background-color: black;
    background-image:
      linear-gradient(
        to right,
        #777 0.5em,
        transparent 0.5em 5.5em,
        #777 5.5em
      ),
      linear-gradient(to bottom, #777 1em, transparent),
      linear-gradient(to bottom, #777 1em, transparent),
      linear-gradient(to bottom, #777 1em, transparent),
      linear-gradient(to bottom, #777 1em, transparent),
      linear-gradient(to bottom, #777 1em, transparent),
      linear-gradient(
        to right,
        #777 0.5em,
        transparent 0.5em 17.5em,
        #777 17.5em
      ),
      linear-gradient(to top, #777 1em, transparent 1em 10em, #777 10em);
    background-size:
      6em 24em,
      100% 1em,
      100% 1em,
      100% 1em,
      100% 1em,
      100% 1em,
      18em 13em,
      18em 11em;
    background-position:
      left top,
      center top,
      center 6em,
      center 12em,
      center 18em,
      center 24em,
      center 27em,
      center bottom;
    background-repeat:
      repeat-x, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat,
      no-repeat, no-repeat;
  }
  .front {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2em;
    border: 0.125em solid black;
    border-radius: 0.3em;
    background-color: #333;
    transform: translateY(-0.125em) translateZ(46vw);
  }
}
</style>
