import { useState } from 'react'
import { FaCog, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Users.css'

function Users() {
  const navigate = useNavigate()
  const [users] = useState([
    {
      id: 1,
      name: 'Aarav Sharma',
      profilePic: 'https://randomuser.me/api/portraits/men/51.jpg',
      dateCreated: '2023-08-15',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Priya Verma',
      profilePic: 'https://randomuser.me/api/portraits/women/65.jpg',
      dateCreated: '2023-09-10',
      role: 'User',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Rohan Patel',
      profilePic: 'https://randomuser.me/api/portraits/men/22.jpg',
      dateCreated: '2024-01-05',
      role: 'Moderator',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Sneha Deshmukh',
      profilePic: 'https://randomuser.me/api/portraits/women/12.jpg',
      dateCreated: '2024-02-20',
      role: 'User',
      status: 'Pending',
    },
    {
      id: 5,
      name: 'Vikram Joshi',
      profilePic: 'https://randomuser.me/api/portraits/men/44.jpg',
      dateCreated: '2023-07-12',
      role: 'User',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Ananya Iyer',
      profilePic: 'https://randomuser.me/api/portraits/women/29.jpg',
      dateCreated: '2024-03-18',
      role: 'Admin',
      status: 'Inactive',
    },
    {
      id: 7,
      name: 'Kabir Nair',
      profilePic: 'https://randomuser.me/api/portraits/men/36.jpg',
      dateCreated: '2024-04-05',
      role: 'Moderator',
      status: 'Active',
    },
    {
      id: 8,
      name: 'Meera Kulkarni',
      profilePic: 'https://randomuser.me/api/portraits/women/55.jpg',
      dateCreated: '2024-02-10',
      role: 'User',
      status: 'Pending',
    },
  ])
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
    toast.success("Logout Successfully")
  }
  return (
    <div className='user-container'>
      <div className='user-head'>
        <h2>Users</h2>
        <button className='logout-btn' onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className='table-wrapper'>
        <table className='user-table'>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Date Created</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td className='user-info'>
                  <img src={user.profilePic} alt={user.name} />
                  <span>{user.name}</span>
                </td>
                <td>
                  {new Date(user.dateCreated).toLocaleDateString('en-IN')}
                </td>
                <td>{user.role}</td>
                <td>
                  <span className={`status ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td className='action-icons'>
                  <FaCog className='icon settings' />
                  <FaTimes className='icon delete' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
