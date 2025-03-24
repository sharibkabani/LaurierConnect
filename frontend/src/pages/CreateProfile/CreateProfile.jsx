import styles from './CreateProfile.module.css'

export default function CreateProfile(){

    return(

        <div className={styles.container}>
            <ul className={styles.leftUL}>
                <li><h2>Find Your Team Today</h2></li>
                <li><h1 className={styles.h1} >Let's start the journey, together.</h1></li>
                <li><h3 className={styles.laurierConnect}>Laurier Connect</h3></li>
            </ul>
            <ul className={styles.rightUL}>
                {/* Personal Info */}
                <ul className={styles.rows}>
                <li><input className={styles.shortInput} type="text" id="fname" name="fname" placeholder="First Name*"></input></li>
                <li><input className={styles.shortInput} type="text" id="sname" name="sname" placeholder="Last Name*"></input></li>
                </ul>
                <li><input className={styles.input} type="text" id="email" name="email" placeholder="Email*"></input></li>

                {/* Degree Info */}
                <ul className={styles.rows}>
                <li><input className={styles.shortInput} type="text" id="deg" name="degree" placeholder="Your Major*"></input></li>
                <li><input className={styles.shortInput} type="text" id="min" name="minor" placeholder="Your Minor"></input></li>
                </ul>

                <li><textarea className={styles.longInput} type="text" id="ccode" name="courses" placeholder="Enter all the course codes of the courses you are taking this semester*"></textarea></li>

                {/* Experience */}
                <li><textarea className={styles.longInput} type="text" id="exp" name="experience" placeholder="Give a rundown of your experience in a couple sentences. What makes you an asset to a team?*"></textarea></li>
                <li><input className={styles.input} type="text" id="web" name="website" placeholder="Link to your portfolio"></input></li>
                
                <ul className={styles.rows}>
                <li><input className={styles.shortInput} type="text" id="linkedin" name="linkedin" placeholder="LinkedIn"></input></li>
                <li><input className={styles.shortInput} type="text" id="ghub" name="github" placeholder="GitHub Link"></input></li>
                </ul>
                
                <li><button className={styles.button}>Sign Up</button></li>
            </ul>
        </div>

    );
};