import Vue from 'vue';
import Hello from '@/components/Greeting';

describe('Greeting.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#greeting h1').textContent)
      .to.equal('Welcome');
  });
});
