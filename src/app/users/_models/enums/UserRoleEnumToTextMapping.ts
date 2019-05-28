import { UserRole } from './UserRoleEnum';

export const UserRoleEnumToTextMapping = {
    [UserRole.ROLE_ADMIN]: "Administrator",
    [UserRole.ROLE_ORGANIZER]: "Trip Organiser",
    [UserRole.ROLE_USER]: "User"
}
