<script setup lang="ts">
/*
 *****************************************************************************
 * The resume page displays my resume in a CSS-generated laptop, in
 * landscape mode, or in a CSS-generated phone, in portrait mode.
 *****************************************************************************
 */

/*
 * Logic to allow scrolling on the resume via the scroll bar triangles.
 * This doesn't work so well on the touch devices (e.g., iPad), so
 * I'd be interested in improving that further.
 */
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
  scrollUpElem!.addEventListener('touchstart', mouseDownScrollUp)
  scrollUpElem!.addEventListener('touchend', mouseUp)
  scrollDownElem!.addEventListener('touchstart', mouseDownScrollDown)
  scrollDownElem!.addEventListener('touchend', mouseUp)
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
                <span>Paul Seale,&nbsp;</span>
                <span>Software Engineer</span>
              </h1>
            </header>
            <section>
              <h2>About</h2>
              <p>
                Accomplished software engineer with 25 years of experience using
                a wide variety of programming languages and environments.
                Exceptional ability to write efficient, well-designed and
                documented solutions to complex and interesting problems.
                Interacts well with others by keeping things light and
                maintaining perspective.
              </p>
            </section>
            <section>
              <h2>Objective</h2>
              <p>
                Seeking a challenging full-stack or front-end web developer
                role. Experienced in Vue, Angular, TypeScript, and CSS.
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
                  href="https://linkedin.com/in/paul-seale-50a086385"
                  target="_blank"
                >
                  <img
                    src="@/assets/images/linkedin-logo.png"
                    alt="LinkedIn logo"
                  />
                </a>
              </p>
            </section>
            <section>
              <h2>Experience</h2>
              <article class="history">
                <ul class="title">
                  <li>Senior Application Developer</li>
                  <li>July 2014 - August 2025</li>
                  <li>Accenture/L3Harris - Tempe, AZ</li>
                </ul>
                <ul class="duties">
                  <li>
                    Angular front-end developer on MES web-based application
                  </li>
                  <li>
                    Developed with TypeScript, CSS, RxJS, Angular Material,
                    Node.js
                  </li>
                  <li>REST endpoint development with Express.js and Fastify</li>
                  <li>Migrated web server backend from Oracle to SQL Server</li>
                  <li>
                    Developed Oracle and SQL Server tables, queries, and stored
                    procedures
                  </li>
                  <li>Unix shell scripting and C/C++ development</li>
                  <li>Experience as an Agile team member</li>
                  <li>
                    Experience with DevOps tools: Jira, Git, Bitbucket,
                    Confluence, Jenkins
                  </li>
                </ul>
              </article>
              <article class="history">
                <ul class="title">
                  <li>Principal Software Engineer</li>
                  <li>October 2010 - March 2012</li>
                  <li>PayPal - Scottsdale, AZ</li>
                </ul>
                <ul class="duties">
                  <li>
                    Member of the merchant reporting and fraud prevention groups
                  </li>
                  <li>
                    Implemented merchant reports with Oracle PL/SQL stored
                    procedures
                  </li>
                  <li>Experience with Actuate and Visual Basic</li>
                  <li>Developed fraud prevention module in C++</li>
                </ul>
              </article>
              <article class="history">
                <ul class="title">
                  <li>Principal Software Engineer</li>
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
                  <li>Languages used: C++, C#</li>
                  <li>Manually generated UML documentation from source code</li>
                  <li>Implemented debugger for Btrieve database</li>
                  <li>
                    Implemented debugger for hardware controller used with
                    self-storage units
                  </li>
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
                    Automated the release build process, including Wise
                    Installer scripts
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

<style src="@/assets/styles/ResumePage.scss" lang="sass" scoped></style>
