<?php

// Bottom
// -------------------------------------------------------
require_once __DIR__ . '/bottom/bottom.php';

// Left panel
// -------------------------------------------------------
require_once __DIR__ . '/top/top.php';

// Logo
require_once __DIR__ . '/top/logo/login.php';
require_once __DIR__ . '/top/logo/logout.php';
require_once __DIR__ . '/top/logo/newUser.php';
require_once __DIR__ . '/top/logo/editAccount.php';

// Left panel
// -------------------------------------------------------
// Content
require_once __DIR__ . '/left/content/editPageTheme.php';
require_once __DIR__ . '/left/content/updatePageTheme.php';


// Right panel
// -------------------------------------------------------
require_once __DIR__ . '/right/theme/editTheme.php';
require_once __DIR__ . '/right/theme/updateTheme.php';

// Page
require_once __DIR__ . '/right/page/toggleTitle.php';
require_once __DIR__ . '/right/page/togglePagePublic.php';
require_once __DIR__ . '/right/page/renamePage.php';

// Pages
require_once __DIR__ . '/right/pages/createPage.php';
require_once __DIR__ . '/right/pages/deletePage.php';
require_once __DIR__ . '/right/pages/savePage.php';

// Settings
require_once __DIR__ . '/right/settings/editPages.php';
require_once __DIR__ . '/right/settings/updatePagePositions.php';
require_once __DIR__ . '/right/settings/editUsers.php';
require_once __DIR__ . '/right/settings/editSettings.php';

// Theme
require_once __DIR__ . '/right/theme/createDefaultTheme.php';

// Theme Colors
require_once __DIR__ . '/right/theme/colors/editColors.php';
require_once __DIR__ . '/right/theme/colors/getColors.php';

// Theme Delete
require_once __DIR__ . '/right/theme/delete/deleteTheme.php';

// Theme Borders
require_once __DIR__ . '/right/theme/borders/editBorders.php';

// Theme Fonts
require_once __DIR__ . '/right/theme/fonts/editFonts.php';

// Theme Shadows
require_once __DIR__ . '/right/theme/shadows/editShadows.php';

// Theme Layout
require_once __DIR__ . '/right/theme/layout/editLayout.php';
require_once __DIR__ . '/right/theme/save/saveTheme.php';

// Sub
// -------------------------------------------------------
require_once __DIR__ . '/sub/getSub.php';

// Tools
// -------------------------------------------------------
require_once __DIR__ . '/tools/sql.php';
require_once __DIR__ . '/tools/getValue.php';
require_once __DIR__ . '/tools/popup.php';
require_once __DIR__ . '/tools/errorMsg.php';
require_once __DIR__ . '/tools/reply.php';


// Page
// -------------------------------------------------------
require_once __DIR__ . '/page/get.php';
require_once __DIR__ . '/page/getPageTheme.php';
?>