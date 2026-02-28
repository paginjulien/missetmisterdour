import { Route, Switch } from 'wouter';

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={() => <div>Home</div>} />
      <Route path="/event/2026" component={() => <div>Event 2026</div>} />
      <Route path="/candidates" component={() => <div>Candidates</div>} />
      <Route path="/candidate/:id" component={() => <div>Candidate</div>} />
      <Route path="/ranking" component={() => <div>Ranking</div>} />
      <Route path="/news" component={() => <div>News</div>} />
      <Route path="/sponsors" component={() => <div>Sponsors</div>} />
      <Route path="/press" component={() => <div>Press</div>} />
      <Route path="/about" component={() => <div>About</div>} />
      <Route path="/contact" component={() => <div>Contact</div>} />
      <Route path="/verify/:certificateId" component={() => <div>Verify</div>} />

      <Route path="/dashboard" component={() => <div>Dashboard</div>} />
      <Route path="/my-profile" component={() => <div>My Profile</div>} />
      <Route path="/social-tracking" component={() => <div>Social Tracking</div>} />
      <Route path="/gallery" component={() => <div>Gallery</div>} />
      <Route path="/settings" component={() => <div>Settings</div>} />

      <Route path="/admin" component={() => <div>Admin</div>} />
      <Route path="/admin/candidates" component={() => <div>Admin Candidates</div>} />
      <Route path="/admin/invitations" component={() => <div>Admin Invitations</div>} />
      <Route path="/admin/onboarding" component={() => <div>Admin Onboarding</div>} />
      <Route path="/admin/articles" component={() => <div>Admin Articles</div>} />
      <Route path="/admin/sponsors" component={() => <div>Admin Sponsors</div>} />
      <Route path="/admin/analytics" component={() => <div>Admin Analytics</div>} />
    </Switch>
  );
}
