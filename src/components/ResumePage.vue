<script setup lang="ts">
/* Author: Paul Seale */

window.onload = function () {
  let intervalId: number | null = null
  const scrollUpElem = document.querySelector('.scrollup')
  const scrollDownElem: HTMLElement | null =
    document.querySelector('.scrolldown')
  const scrollableElem: HTMLElement | null =
    document.querySelector('.scrollable')

  function clearIntervalId() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function scrollUp() {
    scrollableElem!.scrollTop--
  }

  function scrollDown() {
    scrollableElem!.scrollTop++
  }

  function mouseDownScrollDown() {
    clearIntervalId()
    intervalId = setInterval(scrollDown, 1)
  }

  function mouseDownScrollUp() {
    clearIntervalId()
    intervalId = setInterval(scrollUp, 1)
  }

  function mouseUp() {
    clearIntervalId()
  }

  scrollUpElem!.addEventListener('mousedown', mouseDownScrollUp)
  scrollUpElem!.addEventListener('mouseup', mouseUp)
  scrollDownElem!.addEventListener('mousedown', mouseDownScrollDown)
  scrollDownElem!.addEventListener('mouseup', mouseUp)
}
</script>
<template>
  <div class="resume">
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
                Software developer with over 20 years of experience. Attention
                to detail and quality while keeping things simple. Passionate
                about learning new technologies and skills. Interacts well with
                others by keeping things light and maintaining perspective.
              </p>
            </section>
            <section>
              <h2>Objective</h2>
              <p>
                To use and expand my knowledge of browser technologies in the
                role of front-end web developer. Interests include CSS,
                Typescript, HTML5, frameworks, cross-browser compatibility, web
                accessibility, and responsive design.
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
                  <li>
                    Develops SSIS packages and ETL processes for SQL Server
                  </li>
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
                    Developed XML-based Windows services for real estate
                    appraisal transactions
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
  </div>
</template>

<style lang="sass" scoped>
@use 'sass:meta';
@include meta.load-css('@/assets/styles/styles.scss');
</style>
