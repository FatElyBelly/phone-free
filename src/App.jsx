import './App.css'
import { useState, useEffect } from 'react'
import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);


  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };


  return (
    <div className="text-gray-800">
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-gradient-green">Phone-Free Summer</a>
          <div className="flex items-center space-x-4">
            <a href="#about" className="text-gray-600 hover:text-emerald-600 transition duration-300">About Us</a>
            <a href="#resources" className="text-gray-600 hover:text-emerald-600 transition duration-300">Resources</a>
            <a href="#streak" className="text-gray-600 hover:text-emerald-600 transition duration-300">My Streak</a>
            {user ? (
              <button className="signOutBtn" onClick={handleLogout}>
                <span>Sign out</span>
              </button>

            ) : (
              <button className="signInBtn" onClick={handleGoogleSignIn}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.24 10.24c-2.43 0-4.4 1.97-4.4 4.4s1.97 4.4 4.4 4.4c2.16 0 3.75-.98 4.67-1.99l.86.86c-1.3 1.25-3.07 2.08-5.53 2.08-4.85 0-8.8-3.95-8.8-8.8s3.95-8.8 8.8-8.8c4.85 0 8.8 3.95 8.8 8.8 0 .58-.06 1.15-.17 1.71h-8.63z" fill="#4285F4" />
                  <path d="M12.24 10.24c-2.43 0-4.4 1.97-4.4 4.4s1.97 4.4 4.4 4.4c2.16 0 3.75-.98 4.67-1.99l.86.86c-1.3 1.25-3.07 2.08-5.53 2.08-4.85 0-8.8-3.95-8.8-8.8s3.95-8.8 8.8-8.8c4.85 0 8.8 3.95 8.8 8.8 0 .58-.06 1.15-.17 1.71h-8.63z" fill="#34A853" />
                  <path d="M21.75 12.24c0-.58.06-1.15.17-1.71h-8.63v3.29h4.94c-.21 1.05-.8 1.94-1.68 2.53l2.67 2.07c1.55-1.42 2.45-3.52 2.45-6.18z" fill="#FBBC05" />
                  <path d="M12.24 21.04c2.43 0 4.4-1.97 4.4-4.4s-1.97-4.4-4.4-4.4-4.4 1.97-4.4 4.4 1.97 4.4 4.4 4.4z" fill="#EA4335" />
                </svg>
                <span>Sign in with Google</span>
              </button>
            )}

          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden py-20 text-center gradient-green text-white shadow-lg">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Reclaim Your Summer: Go Phone-Free!
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join the challenge and discover a summer of real connections, new hobbies, and unforgettable moments.
          </p>
          <button id="takePledgeButton" className="btn-primary text-xl md:text-2xl animate-bounce">
            Take the Pledge!
          </button>
        </div>
        <div className="absolute inset-0 z-0">
          <div className="absolute w-64 h-64 bg-white opacity-10 rounded-full -top-16 -left-16 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -bottom-32 -right-32 animate-pulse delay-200"></div>
        </div>
      </header>

      <section className="py-20 bg-white text-center shadow-inner">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-emerald-700">Students Who've Taken the Pledge:</h2>
          <p id="participantCount" className="text-8xl md:text-9xl font-extrabold text-gradient-green transition-all duration-500 ease-out">0</p>
          <p className="text-xl text-gray-600 mt-4">Join them and make this summer truly yours!</p>
        </div>
      </section>

      <section id="about" className="py-20 bg-f0fdf4 text-gray-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6 text-emerald-700">About This Initiative</h2>
            <p className="text-lg leading-relaxed mb-4">
              This "Phone-Free Summer Challenge" is a student-led initiative proudly brought to you by the
              <span className="font-semibold text-emerald-600"> Terminale of French School Jakarta</span>.
              As we prepare for our next steps, we recognize the growing impact of digital distractions on our lives
              and well-being.
            </p>
            <p className="text-lg leading-relaxed">
              Our goal is to encourage our peers and the wider student community to embrace a more mindful and
              connected summer, free from the constant pull of screens. We believe that by reducing phone usage,
              we can unlock new experiences, foster deeper relationships, and truly recharge before the new academic year.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="https://placehold.co/400x300/d1fae5/065f46?text=French+School+Jakarta" alt="French School Jakarta" className="rounded-lg shadow-lg max-w-full h-auto"></img>
          </div>
        </div>
      </section>

      <section className="py-20 bg-f0fdf4 text-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-emerald-700">Why Go Phone-Free This Summer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 text-emerald-600">Boost Creativity</h3>
              <p className="text-gray-700">
                Without constant digital distractions, your mind is free to wander, innovate, and come up with new ideas.
                Rediscover hobbies like reading, painting, or playing an instrument.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 text-emerald-600">Improve Well-being</h3>
              <p className="text-gray-700">
                Reduce stress, anxiety, and eye strain. Better sleep, more physical activity, and a greater sense of peace await you.
                Focus on your mental and physical health.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 text-emerald-600">Strengthen Connections</h3>
              <p className="text-gray-700">
                Engage more deeply with family and friends. Have meaningful conversations, create shared memories,
                and truly be present in every interaction.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 text-emerald-600">Explore the World</h3>
              <p className="text-gray-700">
                Look up from your screen and discover the beauty around you. Explore nature, visit new places,
                or simply observe your surroundings with fresh eyes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 text-emerald-600">Boost Productivity</h3>
              <p className="text-gray-700">
                Without constant notifications, you can focus better on tasks, whether it's summer homework,
                a personal project, or learning a new skill.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 text-emerald-600">More "Me" Time</h3>
              <p className="text-gray-700">
                Enjoy solitude and introspection. Use the time to reflect, plan, or simply relax without the pressure
                of digital engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="py-20 bg-white text-gray-800 shadow-inner">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-emerald-700">Tips & Resources for Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-f0fdf4 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-emerald-600">Practical Tips</h3>
              <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
                <li>Designate "phone-free zones" in your home (e.g., dining table, bedroom).</li>
                <li>Set specific times for checking messages, and stick to them.</li>
                <li>Turn off unnecessary notifications.</li>
                <li>Find alternative activities: read a book, go for a walk, learn to cook, play board games.</li>
                <li>Inform friends and family about your challenge so they can support you.</li>
                <li>Use an alarm clock instead of your phone for waking up.</li>
              </ul>
            </div>
            <div className="bg-f0fdf4 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-emerald-600">Helpful Resources</h3>
              <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
                <li><a href="https://www.psychologytoday.com/us/blog/the-modern-mind/201907/5-ways-reduce-your-phone-addiction" target="_blank" className="text-blue-600 hover:underline">5 Ways to Reduce Your Phone Addiction (Psychology Today)</a></li>
                <li><a href="https://www.nytimes.com/guides/smarterliving/how-to-disconnect" target="_blank" className="text-blue-600 hover:underline">How to Disconnect (New York Times)</a></li>
                <li><a href="https://www.forbes.com/sites/forbescoachescouncil/2020/09/02/the-benefits-of-a-digital-detox-and-how-to-do-it/" target="_blank" className="text-blue-600 hover:underline">The Benefits of a Digital Detox (Forbes)</a></li>
                <li>Explore local parks, libraries, and community centers for activities.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-emerald-800 text-white py-10 text-center">
        <div className="container mx-auto px-4">
          <p>&copy 2025 Phone-Free Summer Challenge. An initiative by the class of Terminale from the French School Jakarta.</p>
          <p className="mt-2 text-sm opacity-80">Embrace the real world. Disconnect to reconnect.</p>
        </div>
      </footer>
    </div>
  )
}

export default App