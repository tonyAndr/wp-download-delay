=== Files Download Delay ===
Tags: files, download, delay, documents, media
Requires at least: 5.5
Tested up to: 5.9.3
Requires PHP: 7.2
Stable tag: 1.0.6
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

When user tries to download a file plugin adds countdown timer with a customizable layout.

== Description ==

Files Download Delay plugin wraps file download links with customizable layout which allows you to show any kind of content. For example, while users are waiting for download, you can show them email subscription form, feedback form, related content or even ads. 

Download links can be wrapped automatically based on conditions (file extension, element class) or manually using the shortcode `[fddwrap]<a href="path/to/file.pdf">Download</a>[/fddwrap]`.

Features which you can easily customize:
* delay time in seconds before download happens,
* text fields and html content shown to user during countdown and when timer is finished,
* content when download is failed (e.g., when file is missing) 
* layout appearance (shadow, curved edges, colors, etc.)
* auto-wrap options (custom list of file extensions or/and element's class)

Suitable to wrap any type of content including documents (xlsx, docx, pdf,...), media (wav, mp3, mp4,...) or archives (zip, rar, tar.gz,...) - no limits here.

**How to use:**

1. Install the plugin and go to the settings
2. In the section Display settings replace built-in messages to any content you wish to show to your users
3. Enable auto-wrap toggle in the corresponding section, or enable timer in the Gutenberg editor (see block's settings for "File" block) or wrap a download link using this shortcode `[fddwrap]link here[/fddwrap]`. 
4. Open just edited article and click on the file download link
5. At this point should be able to see a countdown timer under the download link you just clicked

== Frequently Asked Questions ==

= Auto-wrap isn't working =

Please double-check that the toggle is ON in the plugin settings and you did add file extensions in the corresponding field.

If your download links don't have file extensions (ex: domain.com/files/download?name=magicfile) make sure that `<a>` element or its parents have some class like `<a class="magic-class">`. Add this class to the corresponding field in auto-wrap settings.

== Screenshots ==

1. The countdown when user is trying to download a file
2. Extended configuration options of the "File" block in the editor
3. Auto-wrap options on the plugin's settings page

== Changelog ==

= 1.0.7 = 
* Minor security fixes

= 1.0.6 = 
* Removed Freemius libs & premium version

= 1.0.5 = 
* Vulnerability fixes
 
= 1.0.4 =
* Countdown timer will be paused if the tab is not active
* Security fixes

= 1.0.3 =
* Little Fixes

= 1.0.2 =
* Fixed Description
* Fixed "New Tab" template styles
* Added font-color contrast for light/dark timer background color
* WP Versions Support Extended to 5.5

= 1.0.1 =
* Public Release

= 1.0 =
* Pre-Release