<?php
	$page_title = 'ReferralCandy | Integrations';
	$page_description = '';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal';
	$page_class = 'integration__details';
	$page_active = 'integration__referralcandy';
?>
<?php include('../templates/static/header.php'); ?>

<div class="rc_layout__container">
	<div class="rc_layout">
		<div class="rc_layout__sm__4">
			<img src="/assets/images/integrations/referralcandy_logo.png" alt="ReferralCandy logo" class="integration__details__logo">
		</div><!-- .grid__sm__4 -->
		<div class="rc_layout__sm__8">
			<div class="integration__details">
				<div class="integration__header">
					<h1 class="integration__title">Referral Candy</h1>
				</div><!-- .integration__header -->
				<div class="integration__info">
					<p><a href="https://apps.shopify.com/referralcandy" target="_blank" class="integration__website rc_link">apps.shopify.com/referralcandy</a></p>
					<p>ReferralCandy helps you increase your sales by rewarding your customers when they refer people to your store. Give your customers a personal reward link that they can share with their friends.</p>
				</div><!-- .integration__info -->
				<h5>Supported features</h5>
				<ul class="integration__features rc_list_items">
					<li class="rc_tick_ok">Offer rewards to customers and their friends.</li>
					<li class="rc_tick_ok">Run a campaign for subscription OR one-time purchases.</li>
					<li class="rc_tick_ok">Rewards earned for a customer are applied automatically as discounts to customers future subscription orders.</li>
					<li class="rc_tick_ok">Cap how many referrals a customer can give out.</li>
					<li class="rc_tick_ok">Referral tracking can work on both recurring sales made through ReCharge or one time sales.</li>
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