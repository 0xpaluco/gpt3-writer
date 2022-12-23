'use client';

import { TopBar, Footer } from '../../components';
import { Hero } from './Hero';

export default function HomeView() {
  
  return (
    <div className="isolate bg-white">
      <TopBar/>
      <Hero/>
      <Footer/>
    </div>
  )
}
