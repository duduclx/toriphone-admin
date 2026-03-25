import useSoundsHelper from "./soundsHelper";
import useSkillsRulesHelper from "./SkillsRulesHelper";
import { useApis } from "../../ApiProvider";

const getLabelForFallback = (destination) => {
  const { sounds } = useApis();
  const { getSoundLabel } = useSoundsHelper();
  const { getSkillRuleLabel } = useSkillsRulesHelper();

  if (!destination) {
    return null;
  }

    switch (destination.type) {
      case "user":
        return {
          ...destination,
          label: `${destination.user_firstname} ${destination.user_lastname}`,
        };
      case "ivr":
        return {
          ...destination,
          label: destination.ivr_name,
        };
      case "queue":
        return {
          ...destination,
          label: destination.queue_name,
          skill_rule: {
            label: destination.skill_rule_id ? getSkillRuleLabel(destination.skill_rule_id) : "",
            value: destination.skill_rule_id
          }
        };
      case "group":
        return {
          ...destination,
          label: destination.group_label,
        };
      case "switchboard":
        return {
          ...destination,
          label: destination.switchboard_name,
        };
      case "hangup":
        return {
          ...destination,
          label: destination.cause,
        }
      case "sound":
       const sound = getSoundLabel(destination.filename, sounds);
        return {
          ...destination,
          label: sound?.label,
        };
       case "voicemail":
        return {
          ...destination,
          label: destination.voicemail_name
        }
        case "conference":
          return {
            ...destination,
            label: destination.conference_name
          }
      default:
        return destination;
    }
  };

export default getLabelForFallback