			</div>
			<div id="push"></div>
		</div>
		<footer class="footer">
			<div class="rc_layout__container">
				<div class="rc_layout">
					<div class="rc_layout__md__4 rc_layout__lg__3 footer__links">
						<h4 class="rc_caption footer__title">Product</h4>
						<ul class="rc_list">
							<li<?php if ($the_active_page == 'features'){ echo " class=\"active\""; } ?>><a href="/features">Features</a></li>
							<li<?php if ($the_active_page == 'integrations'){ echo " class=\"active\""; } ?>><a href="/integrations">Integrations</a></li>
							<li<?php if ($the_active_page == 'enterprise'){ echo " class=\"active\""; } ?>><a href="/enterprise">Enterprise</a></li>
							<li<?php if ($the_active_page == 'developers'){ echo " class=\"active\""; } ?>><a href="/developers">Developers</a></li>
							<li<?php if ($the_active_page == 'partners'){ echo " class=\"active\""; } ?>><a href="/partners">Partners</a></li>
							<li<?php if ($the_active_page == 'shopify-plus'){ echo " class=\"active\""; } ?>><a href="/shopify-plus">Shopify Plus</a></li>
						</ul>
					</div>
					<div class="rc_layout__md__4 rc_layout__lg__3 footer__links">
						<h4 class="rc_caption footer__title">Resources</h4>
						<ul class="rc_list">
							<li><a href="http://support.rechargepayments.com" target="_blank">Knowledge Base</a></li>
							<li<?php if ($the_active_page == 'support-hours'){ echo " class=\"active\""; } ?>><a href="/support-hours">Support Hours</a></li>
							<li><a href="http://status.rechargepayments.com/" target="_blank">System Status</a></li>
							<li<?php if ($the_active_page == 'case-studies'){ echo " class=\"active\""; } ?>><a href="/case-studies">Case Studies</a></li>
							<li<?php if ($the_active_page == 'experts'){ echo " class=\"active\""; } ?>><a href="/experts">Experts</a></li>
							<li<?php if ($the_active_page == 'migrations'){ echo " class=\"active\""; } ?>><a href="/migrations">Migrations</a></li>
							<li<?php if ($the_active_page == 'blog'){ echo " class=\"active\""; } ?>><a href="http://blog.rechargeapps.com" target="_blank">Blog</a></li>
						</ul>
					</div>
					<div class="rc_layout__md__4 rc_layout__lg__3 footer__links">
						<h4 class="rc_caption footer__title">Company</h4>
						<ul class="rc_list">
							<li<?php if ($the_active_page == 'about'){ echo " class=\"active\""; } ?>><a href="/about">About</a></li>
							<li<?php if ($the_active_page == 'careers'){ echo " class=\"active\""; } ?>><a href="https://recharge.workable.com/" target="_blank">Careers</a></li>
							<li<?php if ($the_active_page == 'contact'){ echo " class=\"active\""; } ?>><?php echo hide_email('support@rechargepayments.com','','Contact'); ?></li>
							<li<?php if ($the_active_page == 'media-kit'){ echo " class=\"active\""; } ?>><a href="/media-kit">Media Kit</a></li>
						</ul>
					</div>
					<div class="rc_layout__lg__3 footer__address">
						<div class="footer__logo">
							<img src="/assets/images/layout/recharge-logo.svg" width="164" height="42" alt="ReCharge logo">
						</div>
						<address>
							3030 Nebraska Avenue<br>
							Suite 301A<br>
							Santa Monica, California<br>
							<?php echo hide_email('support@rechargepayments.com', 'rc_link'); ?>
						</address>
						<div class="footer__social-networks">
							<a href="#" target="_blank" class="social-icon"><span class="fa fa-facebook"></span></a>
							<a href="#" target="_blank" class="social-icon"><span class="fa fa-twitter"></span></a>
							<a href="#" target="_blank" class="social-icon"><span class="fa fa-linkedin"></span></a>
						</div>
					</div>
				</div>
				<div class="rc_layout">
					<div class="rc_layout__full rc_text--center footer__copyright">
						<span>Copyright &copy; 2014-<?php echo date("Y"); ?></span>
						<span><a href="/privacy-policy">Privacy Policy</a></span>
						<span><a href="/terms-of-service">Terms of Service</a></span>
					</div>
				</div>
			</div>
		</footer>
		<script>
			$(function(){
				// Google Analytics Event Tracking
				$(document)
					.on('click', '#trigger__free-trial-pricing', function(){
						ga('send', 'event', 'modals', 'triggered', 'Pricing Page Link', location.href);
					})
					.on('click', '#trigger__free-trial-v2', function(){
						ga('send', 'event', 'modals', 'triggered', 'Floating Navbar Link', location.href);
					})
					.on('click', '#trigger__free-trial', function(){
						ga('send', 'event', 'modals', 'triggered', 'Homepage Banner Link', location.href);
					})

				$(window).on('scroll', function(){
					if ($(this).scrollTop() >= 78 && $(window).width() >= 768){
						$('body').addClass('with-navbar')
						$('.navbar').addClass('navbar-fixed');
						$('.navbar__button').addClass('button--primary');
						$('.navbar__button').removeClass('button--secondary');
					} else {
						// If user scrolls within the navbar (and not on mobile), remove the support class from the body to prevent duplicated actions and animate the navbar back up. On completion, remove styles created by jQuery animation and remove the transformation styles.
						if ($('body').hasClass('with-navbar') && $(window).width() >= 768){
							$('body').removeClass('with-navbar').find('.navbar').animate({
								'top': -78
							}, 100, function(){
								$(this).attr('style', '').removeClass('navbar-fixed');
								$('.navbar__button').removeClass('button--primary');
								$('.navbar__button').addClass('button--secondary');
							})
						}
					}
				});
			});
		</script>
		<script>
			function DeltaTimer(render, interval) {
				var timeout;
				var lastTime;

				this.start = start;
				this.stop = stop;

				function start() {
					timeout = setTimeout(loop, 0);
					lastTime = + new Date;
					return lastTime;
				}

				function stop() {
					clearTimeout(timeout);
					return lastTime;
				}

				function loop() {
					var thisTime = + new Date;
					var deltaTime = thisTime - lastTime;
					var delay = Math.max(interval - deltaTime, 0);
					timeout = setTimeout(loop, delay);
					lastTime = thisTime + delay;
					render(thisTime);
				}
			}
			function countRevenue(elem) {
				elem.reset();
				elem.start();
			}
			var countUp = new CountUp('revenue_stats__dollars', 0, 740216, 0, 2.2);
			if (!countUp.error) {
				var timer = new DeltaTimer(function (time) {
					countRevenue(countUp);
				}, 3010);
				var start = timer.start();
			} else {
			  console.error(countUp.error);
			}
		</script>
	</body>
</html>