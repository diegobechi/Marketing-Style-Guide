<?php
	$page_title = 'Littledata | Integrations';
	$page_description = '';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal, Littledata';
	$page_class = 'integration__details';
	$page_active = 'integration__littledata';
?>
<?php include('../templates/static/header.php'); ?>

<div class="rc_layout__container">
	<div class="rc_layout">
		<div class="rc_layout__sm__4">
			<img src="/assets/images/integrations/littledata_logo.png" alt="Littledata logo" class="integration__details__logo">
		</div><!-- .grid__sm__4 -->
		<div class="rc_layout__sm__8">
			<div class="integration__details">
				<div class="integration__header">
					<h1 class="integration__title">Littledata</h1>
				</div><!-- .integration__header -->
				<div class="integration__info">
					<p><a href="https://apps.shopify.com/littledata" target="_blank" class="integration__website rc_link">apps.shopify.com/littledata</a></p>
					<p>Fix your Google Analytics setup to include complete sales and marketing data, and understand what it all means. Attribute recurring payments to campaigns, audit your analytics setup as often as you'd like, benchmark your web performance against leading ecommerce sites, set up custom alerts and reporting, and so much more!</p>
				</div><!-- .integration__info -->
				<h5>Supported features</h5>
				<ul class="integration__features rc_list_items">
					<li class="rc_tick_ok">Automatically fix numerous Google Analytics issues, including campaign attribution for recurring payments.</li>
					<li class="rc_tick_ok">Benchmark your site against leading Shopify stores.</li>
					<li class="rc_tick_ok">Connect sales and marketing performance with custom reports and industry insights.</li>
					<li class="rc_tick_ok">Get custom alerts about essential metrics.</li>
				</ul><!-- .integration__features -->
			</div><!-- .integration__details -->
		</div><!-- .grid__sm__8 -->
	</div><!-- .layout -->
</div><!-- .container -->

<div class="rc_layout__background integration__explore">
	<div class="rc_layout__container">
		<h4>Explore other integrations</h4>
		<div class="rc_layout">
			<div class="rc_layout__full">
				<?php include('_listing.php'); ?>
			</div><!-- .layout__full -->
		</div><!-- .layout -->
	</div><!-- .container -->
</div><!-- .integration__explore -->

<?php include('../templates/static/footer.php'); ?>