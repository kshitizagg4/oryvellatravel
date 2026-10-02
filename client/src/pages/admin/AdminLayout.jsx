import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../../admin/api.js';
import { NAV_GROUPS, RESOURCES } from '../../admin/resources.js';

export default function AdminLayout() {
  const navigate = useNavigate();
  if (!isLoggedIn()) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-100">
      <aside className="w-56 shrink-0 border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Admin Panel</p>
          <NavLink to="/admin" end className="mt-1 block font-extrabold text-navy-900 hover:text-ocean-600">
            Dashboard
          </NavLink>
        </div>
        <nav className="p-3">
          {NAV_GROUPS.map((g) => (
            <div key={g.title} className="mt-4 first:mt-1">
              <p className="px-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{g.title}</p>
              {g.keys.map((k) => (
                <NavLink key={k} to={`/admin/${k}`}
                  className={({ isActive }) =>
                    `mt-0.5 block rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      isActive ? 'bg-ocean-50 text-ocean-600' : 'text-slate-600 hover:bg-slate-100'}`}>
                  {RESOURCES[k].label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="p-3">
          <button onClick={() => { logout(); navigate('/admin/login'); }}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-500 hover:bg-red-50 hover:text-red-600">
            Log out
          </button>
        </div>
      </aside>
      <div className="min-w-0 flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
