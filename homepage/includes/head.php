<?php
	# Configure meta tags with base/fallback data.
	# Pre-pend to this title or keyword data if defined in page
	# Replace full description if defined

	$the_page_title = 'Recurring Billing, Subscriptions for Ecommerce | ReCharge';
	$the_page_description = 'ReCharge is the #1 solution for ecommerce stores for recurring billing and subscriptions. Get 90 days free!';
	$the_page_keywords = 'Recurring Billing, Payments, Billing Software, Shopify, Subscriptions';
	$the_page_class = 'page';

	$the_active_page = '';

	# Create the Page Class
	if (isset($page_class)) {
		$the_page_class = $the_page_class . "__" . $page_class;
		if ($page_class != 'home') {
			$the_page_class = 'page ' . $the_page_class;
		}
	}

	# Determine the Active Page
	if (isset($page_active)) {
		$the_active_page = $page_active;
	}

	# Create the Page Title
	if (isset($page_title)) {
		if ($page_title !== ''){
			$the_page_title = $page_title . " | " . $the_page_title;
		}
	}

	# Create the Page Description
	if (isset($page_description)) {
		if ($page_description !== '') {
			$the_page_description = $page_description;
		}
	}

	# Create the Page Keywords
	if (isset($page_keywords)) {
		$the_page_keywords = $page_keywords . ", " . $the_page_keywords;
	}
?>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge"><!-- , chrome=1 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title><?php echo $the_page_title; ?></title>

<meta name="description" content="<?php echo $the_page_description; ?>">
<meta name="keywords" content="<?php echo $the_page_keywords; ?>">

<meta property="og:url" content="https://rechargepayments.com">
<meta property="og:type" content="website">
<meta property="og:title" content="<?php echo $the_page_title; ?>">
<meta property="og:description" content="<?php echo $the_page_description; ?>">
<meta property="og:image" content="https://rechargepayments.com/assets/images/facebook_preview.png">

<meta name="robots" CONTENT="<?php if (ENABLE_SITE === true){ echo "index, follow"; } else { echo "noindex, nofollow"; } ?>">

<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="/manifest.json">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="theme-color" content="#ffffff">

<link href="https://fonts.googleapis.com/css?family=Raleway:100,400,500,600,700,900&amp;subset=latin-ext" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/fontawesome.css">
<link rel="stylesheet" href="/assets/css/main.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="/assets/js/main.js">
<script>
	// Google Analytics
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-96176346-5', 'auto');
	ga('require', 'displayfeatures');
	ga('send', 'pageview');
</script>