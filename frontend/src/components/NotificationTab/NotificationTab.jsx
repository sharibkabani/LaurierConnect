import styles from './NotificationTab.module.css'

export default function NotificationTab(){
    return (
        <nav className={styles.notificationContainer}>

            <div>
            <button className={styles.dropIcon}> <NotificationIcon /></button>
            </div>

            <ul className={styles.notifications}>
                <li>notification1</li>
                <li>notification2</li>
                <li>notification3</li>
                <li>notification4</li>
            </ul>
        </nav>
    );
}

function NotificationIcon(){
    return(<svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#4f22fd"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <polygon id="bell-a" points="2 0 14 0 15.121 2 .844 2"></polygon> <path id="bell-c" d="M13.6666667,13 L13.6666667,6.6 C12.1111111,4.86666667 10.5555556,4 9,4 C7.44444444,4 5.88888889,4.86666667 4.33333333,6.6 L4.33333333,13 L13.6666667,13 Z M14.0866114,15 L3.91338864,15 L3,17 L15,17 L14.0866114,15 Z M5.12601749,19 L3,19 C1.54388295,19 0.575839195,17.4936813 1.18074262,16.1691555 L2.33333333,13.645387 L2.33333333,6.6 C2.33333333,6.10689447 2.51549878,5.6311705 2.84484877,5.26418052 C4.16695933,3.7909716 5.56209505,2.78896193 7.02822031,2.31469815 C7.00966323,2.21935639 7,2.11474621 7,2 C7,0.8954305 7.8954305,0 9,0 C10.1045695,0 11,0.8954305 11,2 C11,2.11474621 10.9903368,2.21935639 10.9717797,2.31469815 C12.4379049,2.78896193 13.8330407,3.7909716 15.1551512,5.26418052 C15.4845012,5.6311705 15.6666667,6.10689447 15.6666667,6.6 L15.6666667,13.645387 L16.8192574,16.1691555 C17.4241608,17.4936813 16.4561171,19 15,19 L12.8739825,19 C12.4299397,20.7252272 10.8638394,22 9,22 C7.13616057,22 5.57006028,20.7252272 5.12601749,19 Z M7.26756439,19 C7.61337381,19.5978014 8.25971764,20 9,20 C9.74028236,20 10.3866262,19.5978014 10.7324356,19 L7.26756439,19 Z"></path> </defs> <g fill="none" fillRule="evenodd" transform="translate(3 1)"> <g transform="translate(1 15)"> <mask id="bell-b" fill="#ffffff"> <use xlinkHref="#bell-a"></use> </mask> <use fill="#4f22fd" fillRule="nonzero" xlinkHref="#bell-a"></use> <g fill="#1A1A1A" mask="url(#bell-b)"> <rect width="24" height="24" transform="translate(-4 -16)"></rect> </g> </g> <mask id="bell-d" fill="#1A1A1A"> <use xlinkHref="#bell-c"></use> </mask> <use fill="#4f22fd" fillRule="nonzero" xlinkHref="#bell-c"></use> <g fill="#4f22fd" mask="url(#bell-d)"> <rect width="24" height="24" transform="translate(-3 -1)"></rect> </g> </g> </g></svg>    )
}