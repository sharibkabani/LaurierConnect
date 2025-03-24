import styles from './SideBarNav.module.css'

export default function SideBarNav(){
    return (
        <nav className={styles.navBar}>
            <button><img className={styles.logo} src="./src/assets/laurierConnectLogo.png" alt="Logo" /></button>
            <ul className={styles.navItems}>
                <li><button><HomeIcon/></button></li>
                <li><button><ProfileIcon /></button></li>
                <li><button><CommunityIcon /></button></li>
                <li><button><SettingsIcon /></button></li>
            </ul>
        </nav>
    );
}

function HomeIcon(){
    return(
        <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#4F22FD"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <rect id="home-a" width="2" height="6"></rect> <path id="home-c" d="M14,19 L17,19 L17,11 C17,10.4477153 17.4477153,10 18,10 L18.5857864,10 L11,2.41421356 L3.41421356,10 L4,10 C4.55228475,10 5,10.4477153 5,11 L5,19 L8,19 L8,13 C8,11.8954305 8.8954305,11 10,11 L12,11 C13.1045695,11 14,11.8954305 14,13 L14,19 Z M3.00145774,12 L1.00182217,12 C0.11107966,12 -0.335005833,10.9228581 0.294844238,10.2928932 L10.2930221,0.292893219 C10.6834752,-0.0976310729 11.3165248,-0.0976310729 11.7069779,0.292893219 L21.7051558,10.2928932 C22.3350058,10.9228581 21.8889203,12 20.9981778,12 L18.9985423,12 L18.9985423,20 C18.9985423,20.5522847 18.5509086,21 17.9987245,21 L4.00127552,21 C3.44909141,21 3.00145774,20.5522847 3.00145774,20 L3.00145774,12 Z M10,13 L10,19 L12,19 L12,13 L10,13 Z"></path> </defs> <g fill="none" fillRule="evenodd"> <g transform="translate(11 14)"> <mask id="home-b" fill="#1A1A1A"> <use xlinkHref="#home-a"></use> </mask> <use fill="#1A1A1A" xlinkHref="#home-a"></use> <g fill="#1A1A1A" mask="url(#home-b)"> <rect width="24" height="24" transform="translate(-11 -14)"></rect> </g> </g> <g transform="translate(1 1)"> <mask id="home-d" fill="#4F22FD"> <use xlinkHref="#home-c"></use> </mask> <use fill="#4F22FD" fillRule="nonzero" xlinkHref="#home-c"></use> <g fill="#4F22FD" mask="url(#home-d)"> <rect width="24" height="24" transform="translate(-1 -1)"></rect> </g> </g> </g> </g></svg>
    )
}

function ProfileIcon(){
    return(
        <svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="none"></rect> <path fillRule="evenodd" clipRule="evenodd" d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z" fill="#4F22FD"></path> <path fillRule="evenodd" clipRule="evenodd" d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z" fill="#4F22FD"></path> </g></svg>
    )
}

function CommunityIcon(){
    return(
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="none"></rect> <path fillRule="evenodd" clipRule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z" fill="#4F22FD"></path> <path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" fill="#4F22FD"></path> <path fillRule="evenodd" clipRule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z" fill="#4F22FD"></path> <path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z" fill="#4F22FD"></path> </g></svg>
    )
}

function SettingsIcon(){
    return(
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24"></rect> <path fillRule="evenodd" clipRule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V4.17071C14.1652 4.58254 15 5.69378 15 7C15 8.30622 14.1652 9.41746 13 9.82929L13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21L11 9.82929C9.83481 9.41746 9 8.30622 9 7C9 5.69378 9.83481 4.58254 11 4.17071V3C11 2.44772 11.4477 2 12 2Z" fill="#4F22FD"></path> <path fillRule="evenodd" clipRule="evenodd" d="M19 2C19.5523 2 20 2.44772 20 3V14.1707C21.1652 14.5825 22 15.6938 22 17C22 18.3062 21.1652 19.4175 20 19.8293V21C20 21.5523 19.5523 22 19 22C18.4477 22 18 21.5523 18 21V19.8293C16.8348 19.4175 16 18.3062 16 17C16 15.6938 16.8348 14.5825 18 14.1707V3C18 2.44772 18.4477 2 19 2Z" fill="#4F22FD"></path> <path fillRule="evenodd" clipRule="evenodd" d="M5 2C5.55228 2 6 2.44772 6 3V14.1707C7.16519 14.5825 8 15.6938 8 17C8 18.3062 7.16519 19.4175 6 19.8293V21C6 21.5523 5.55228 22 5 22C4.44772 22 4 21.5523 4 21V19.8293C2.83481 19.4175 2 18.3062 2 17C2 15.6938 2.83481 14.5825 4 14.1707V3C4 2.44772 4.44772 2 5 2Z" fill="#4F22FD"></path> </g></svg>    
    )
}