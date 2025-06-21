import UserList from './components/UserList';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>🏠 Welcome to the App</h1>
      <UserList />
    </main>
  );
}
