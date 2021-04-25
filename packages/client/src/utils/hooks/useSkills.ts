import { ISkill } from '../../features/skill/skillsSlice'

export const useSkills = (skills: ISkill[]) => {
    if (Array.isArray(skills) && skills.length > 0) {
        return skills.map((item) => {
            return {
                label: item.name,
                value: item.name,
            }
        })
    }

    return []
}
