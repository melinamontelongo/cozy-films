import Collapse from "../components/Collapse";

const About = () => {
    return (
        <div className="container mx-auto mt-32 mb-10">
            <div className="px-20">
                <h2 className="text-4xl text-center font-black mb-10">About <span className="font-['Oleo_Script'] text-primary">Cozy Films</span></h2>
                <div className="grid gap-5">
                    <Collapse
                        title={<span>What is <span className="text-primary">Cozy Films?</span></span>}
                        content={<>
                            <p>This is a web app where you can browse other user's <span className="text-primary">comfort films</span> as well as adding your own to collaborate with our database.</p>
                            <p>You can also <span className="text-primary">like</span> and <span className="text-primary">dislike</span> the films currently in our catalog in order to build your <span className="text-primary">collection.</span></p>
                            <p>You can even leave <span className="text-primary">reviews</span> if you've seen that film and you're willing to share your thoughts on it.</p></>
                        } />
                    <Collapse
                        title={<span>What is a <span className="text-primary">comfort film?</span></span>}
                        content={<>
                            <p>It's a film that makes you <span className="text-primary">feel good</span>, maybe after a rough day, and it does so every time you watch it. It gives you <span className="text-primary">warm and cozy feelings</span>, sometimes tracing back to happy memories.</p>
                            <p>I'm sure you've thought of at least one film while you're reading this so you might as well go and <span className="text-primary">add it</span> to our database if it's not there already.</p>
                            <p>Have fun and <span className="text-primary">share your experience</span> with comfort films on cozy films!</p></>
                        } />
                    <Collapse
                        title={<span>How was this web app <span className="text-primary">made?</span></span>}
                        content={<>
                            <p>This is part of a <span className="text-primary">full-stack MERN project</span>, built using React, DaisyUI and Tailwind to render the front-end, Express and Node for the back-end and MongoDB as its database.</p>
                            <p>End-to-end developed by <a className="underline text-primary" href="https://github.com/melinamontelongo">Melina M.</a></p>
                        </>} />
                    <Collapse
                        title={<span>How is your <span className="text-primary">data</span> being used?</span>}
                        content={<>
                            <p>Your registration data is <span className="text-primary">securely stored</span> on a MongoDB collection where your credentials arrive and stay encrypted. However, make sure you do not enter the same credentials you use elsewhere just for extra security!</p>
                            <p>The authentication process is made through a token that is stored on your browser's <span className="text-primary">cookies</span> once you login, disappearing when you logout.</p>
                            <p>We also make use of your browser's <span className="text-primary">local storage</span> for easy access to your user ID and username, being also removed when you logout.</p>
                            <p>Your data <span className="text-primary">won't</span> be used for commercial or advertisement purposes.</p>
                        </>} />
                </div>
            </div>
        </div>
    );
};

export default About;