=== Files Download Delay ===
Tags: files, download, delay, documents, media
Requires at least: 5.5
Tested up to: 5.8
Requires PHP: 7.2
Stable tag: 1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

When user tries to download a file, plugin adds countdown timer with customizible layout.

== Description ==

Files Download Delay plugin wraps file download links with customizible layout which allows you to show any kind of content. For example, while users are waiting for download, you can show them email subscription form, feedback form, related content or even ads. 

Download links can be wrapped automatically based on conditions (file extension, element class) or manually using the shortcode `[ddwrap]<a href="path/to/file.pdf">Download</a>[/ddwrap]`.

Features which you can easily customize:
* delay time in seconds before download happens,
* text fields and html content shown to user during countdown and when timer is finished,
* content when download is failed (ex.: when file is missing) 
* layout appearence (shadow, curved edges, colors, etc)
* auto-wrap options (custom list of file extensions or/and element's class)

Suitable to wrap any type of content including documents (xlsx, docx, pdf,...), media (wav, mp3, mp4,...) or archives (zip, rar, tar.gz,...) - no limits here.

**How to use:**

1. Install the plugin and go to the settings
2. In the section Display settings replace built-in messages to any content you wish to show to your users
3. Then either enable auto-wrap option in the corresponding section or wrap a file download link in any article with this shortcode `[ddwrap]`
4. Open edited article and click on file download link
5. At this point should be able to see a countdown timer under download link you just clicked

== Frequently Asked Questions ==

= Auto-wrap isn't working =

Please double-check that the toggle is ON in the plugin settings and you did add file extensions in the corresponding field.

If your download links don't have file extensions (ex: domain.com/files/download?name=magicfile) make sure that `<a>` element or it's parents have some class like `<a class="magic-class">`. Add this class to the corresponding field in auto-wrap settings.

== Screenshots ==

Screenshots will be added later...

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Screenshots are stored in the /assets directory.
2. This is the second screen shot

== Changelog ==

= 1.0 =
* Release.