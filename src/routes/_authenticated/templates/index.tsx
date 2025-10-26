import { createFileRoute } from '@tanstack/react-router';

import { Header } from '@/components/layout/header.tsx';
import { ProfileDropdown } from '@/components/profile-dropdown.tsx';
import { Search } from '@/components/search.tsx';
import { ThemeSwitch } from '@/components/theme-switch.tsx';
import UsersProvider from '@/features/users/context/users-context.tsx';


export const Route = createFileRoute('/_authenticated/templates/')({
  component: RouteComponent,
})

function RouteComponent() {


  return (
    <UsersProvider>
      <Header fixed>
        <Search

        />

        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

    </UsersProvider>
  )
  }