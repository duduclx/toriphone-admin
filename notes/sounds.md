ivrEdit
getSoundLabel ne fonctionne pas pour les fichiers system
mais je ne le propose pas dans la création, et ce n'est pas le genre de fichier à utiliser ici.

il serait possible de faire quelque chose de similaire à 
https://github.com/wazo-platform/wazo-ui/blob/master/wazo_ui/plugins/ivr/view.py

```python
def _populate_form(self, form):
        sounds = self.service.list_sound()
        form.menu_sound.choices = self._build_set_choices_sound(sounds)
        form.invalid_sound.choices = self._build_set_choices_sound(sounds)
        form.greeting_sound.choices = self._build_set_choices_sound(sounds)
        form.abort_sound.choices = self._build_set_choices_sound(sounds)
        return form

    def _build_set_choices_sound(self, sounds):
        results = [('', l_('None'))]
        for sound in sounds['items']:
            for file_ in sound['files']:
                for format_ in file_['formats']:
                    name = (
                        format_['path'] if sound['name'] != 'system' else file_['name']
                    )
                    label = self._prepare_sound_filename_label(file_, format_)
                    results.append((name, label))
        return results

    def _prepare_sound_filename_label(self, file_, format_):
        format_label = f' [{format_["format"]}]' if format_['format'] else ''
        language_label = f' ({format_["language"]})' if format_['language'] else ''
        return f'{file_["name"]}{format_label}{language_label}'
```