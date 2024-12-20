"use client";

import { UserButton } from "@clerk/nextjs";
import { House, HousePlus } from "lucide-react";

const UserMenu = () => {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="Add Room"
          labelIcon={<HousePlus size={15} />}
          href="/add-room"
        />
      </UserButton.MenuItems>
      <UserButton.MenuItems>
        <UserButton.Link
          label="My Rooms"
          labelIcon={<House size={15} />}
          href="/my-rooms"
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserMenu;
