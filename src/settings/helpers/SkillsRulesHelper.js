import { useApis } from "../../ApiProvider";

const useSkillsRulesHelper = () => {
  // requirements
  const { queuesSkills} = useApis();

  const getSkillRuleLabel = (skillRule) => {
    const filter =  queuesSkills.items.find((item) => item.id === skillRule)
    return filter.name
  }

  return {
    getSkillRuleLabel
  }
};

export default useSkillsRulesHelper