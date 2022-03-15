const burgerBtn = document.querySelector('.hamburger')
const navMobile = document.querySelector('.nav-mobile')
const navItems = document.querySelectorAll('.nav-mobile__link')
const footerYear = document.querySelector('.footer__year')

const menuItems = document.querySelectorAll('.nav-links__link')
const scrollSpySections = document.querySelectorAll('.section')
const lastSection = document.querySelector('.nav-links__link:last-of-type')

const toggleNav = () => {
    burgerBtn.classList.toggle('is-active')
    navMobile.classList.toggle('nav-mobile--active')

     navItems.forEach(item => {
        item.addEventListener('click', () => {
            burgerBtn.classList.remove('is-active')
            navMobile.classList.remove('nav-mobile--active')
        })
    })
}

const handleCurrentYear = () => {
    const year = (new Date).getFullYear();
    footerYear.innerText = year;
}

const handleScrollSpy = () => {
    if (document.body.classList.contains('main-page')) {
        const sections = []

        scrollSpySections.forEach(section => {
            // console.log(window.scrollY);
            // console.log(section.offsetTop);
            // console.log(section.offsetHeight);
            if (window.scrollY <= section.offsetTop + section.offsetHeight - 103) {
                sections.push(section)

                const activeSection = document.querySelector(`[class*="${sections[0].dataset.section}"]`)
                menuItems.forEach(item => item.classList.remove('active-section'))
                activeSection.classList.add('active-section')
            }
        })
    }
}


handleCurrentYear();
console.log('test');
burgerBtn.addEventListener('click',toggleNav)
window.addEventListener('scroll', handleScrollSpy)