export default function Profile() {
  return (
    <div>
      <h3>Profile</h3>
      <form>
        <label>Username: <input type="text" defaultValue="bo" /></label><br />
        <label>Email: <input type="email" defaultValue="bo@email.com" /></label><br />
        <label>Bio:<br /><textarea rows={3} defaultValue="Add your bio here"></textarea></label><br />
        <button type="button">Save</button>
      </form>
    </div>
  );
}
