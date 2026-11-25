import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <h1>Hello, {user.full_name.split(' ')[0]} 👋</h1>
      {user.role === 'student' ? (
        <>
          <p className="muted">Submit an excuse letter, track its status, and get a QR-verified letter once it is approved.</p>
          <div className="grid-3">
            <Link className="card tile" to="/excuses/new"><h3>New Excuse Letter</h3><p>Tell us why you were absent.</p></Link>
            <Link className="card tile" to="/excuses"><h3>My Excuses</h3><p>Pending, approved and rejected.</p></Link>
            <Link className="card tile" to="/dashboard"><h3>Dashboard</h3><p>Your summary at a glance.</p></Link>
          </div>
          <div className="card steps">
            <h3>How it works</h3>
            <ol>
              <li>Fill out the excuse letter form.</li>
              <li>The admin reviews and approves or rejects it.</li>
              <li>Approved letters get a QR code any teacher can scan to verify.</li>
            </ol>
          </div>
        </>
      ) : (
        <div className="card">
          <p>You are signed in as a guardian. Letters are verified by scanning the QR code printed on a student's approved excuse letter.</p>
        </div>
      )}
    </>
  );
}
