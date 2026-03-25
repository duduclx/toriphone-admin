const bridgeOptions = [
    {value: "type", default: "on", values: ["bridge"]},
    {value: "max_members", default: "off", values: ["inputnumber"]},
    {value: "record_conference", default: "off", values: ["yes", "no"]},
    {value: "record_file", default: "off", values: ["input"]},
    {value: "record_file_append", default: "on", values: ["yes", "no"]},
    {value: "record_file_timestamp", default: "on", values: ["yes", "no"]},
    {value: "record_options", default: "off", values: ["input"]},
    {value: "record_command", default: "off", values: ["input"]},
    {value: "internal_sample_rate", default: "on", values: ["auto"]},
    {value: "maximum_sample_rate", default: "on", values: ["inputnumber"]},
    {value: "mixing_interval", default: "on", values: ["10", "20", "40", "80"]},
    {value: "video_mode", default: "on", values: ["none", "follow_talker", "last_marked", "first_marked", "sfu"]},
    {value: "language", default: "on", values: ["en", "fr"]},
    //{value: "regcontext", default: "on", values: ["conferences"]},
    //{value: "video_update_discard", default: "on", values: ["2000"]},
    //{value: "remb_send_interval", default: "on", values: ["1000"]},
    {value: "remb_behavior", default: "on", values: ["average", "lowest", "highest", "average_all", "lowest_all", "highest_all", "force"]},
    {value: "remb_estimated_bitrate", default: "off", values: ["inputnumber"]},
    {value: "enable_events", default: "off", values: ["yes", "no"]},
]

export default bridgeOptions

/*
sound_join  ; The sound played to everyone when someone enters the conference.
;sound_leave ; The sound played to everyone when someone leaves the conference.
;sound_has_joined ; The sound played before announcing someone's name has
                  ; joined the conference. This is used for user intros.
                  ; Example "_____ has joined the conference"
;sound_has_left ; The sound played when announcing someone's name has
                ; left the conference. This is used for user intros.
                ; Example "_____ has left the conference"
;sound_kicked ; The sound played to a user who has been kicked from the conference.
;sound_muted  ; The sound played when the mute option is toggled on using DTMF menu.
;sound_unmuted  ; The sound played when the mute option is toggled off using DTMF menu.
;sound_only_person ; The sound played when the user is the only person in the conference.
;sound_only_one ; The sound played to a user when there is only one other
                ; person is in the conference.
;sound_there_are  ; The sound played when announcing how many users there
                  ; are in a conference.
;sound_other_in_party; ; This file is used in conjunction with 'sound_there_are"
                       ; when announcing how many users there are in the conference.
                       ; The sounds are stringed together like this.
                       ; "sound_there_are" <number of participants> "sound_other_in_party"
;sound_place_into_conference ; The sound played when someone is placed into the conference
                             ; after waiting for a marked user. This sound is now deprecated
                             ; since it was only ever used improperly and correcting that bug
                             ; made it completely unused.
;sound_wait_for_leader  ; The sound played when a user is placed into a conference that
                        ; can not start until a marked user enters.
;sound_leader_has_left  ; The sound played when the last marked user leaves the conference.
;sound_get_pin ; The sound played when prompting for a conference pin number.
;sound_invalid_pin ; The sound played when an invalid pin is entered too many times.
;sound_locked ; The sound played to a user trying to join a locked conference.
;sound_locked_now ; The sound played to an admin after toggling the conference to locked mode.
;sound_unlocked_now; The sound played to an admin after toggling the conference to unlocked mode.
;sound_error_menu ; The sound played when an invalid menu option is entered.
;sound_begin ; The sound played to the conference when the first marked user enters the conference.
;sound_binaural_on ; The sound played when binaural audio is turned on
;sound_binaural_off ; The sound played when binaural audio is turned off
*/