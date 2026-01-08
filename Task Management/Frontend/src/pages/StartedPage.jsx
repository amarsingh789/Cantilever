// import React from "react"
// import { Button } from "../components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card"
// import { Link } from "react-router-dom"

// const StartedPage = () => {
//   return (
//     <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2">

//       {/* 🔷 BRAND HEADER */}
//       <header className="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-20">
//         <h1 className="text-xl font-bold text-white lg:text-slate-200">
//           TaskPilot
//         </h1>
//       </header>

//       {/* 🖼️ IMAGE SECTION (Mobile + Tablet + Desktop) */}
//       <div className="relative flex items-center justify-center bg-slate-900 overflow-hidden min-h-[45vh] lg:min-h-screen">

//         {/* gradient base */}
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

//         {/* radial glow */}
//         <div className="absolute w-[500px] h-[500px] rounded-full bg-slate-700/30 blur-[120px]" />

//         <img
//           src="https://illustrations.popsy.co/gray/product-launch.svg"
//           alt="Get Started Illustration"
//           className="
//             relative
//             scale-110 sm:scale-125
//             max-w-[90%]
//             max-h-[40vh] sm:max-h-[50vh] lg:max-h-[75vh]
//             object-contain
//             sm:translate-x-4 lg:translate-x-6
//             drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)]
//           "
//         />
//       </div>

//       {/* RIGHT / CONTENT SECTION */}
//       <div className="flex flex-1 items-center justify-center px-6 py-16 lg:py-24 bg-white">
//         <div className="w-full max-w-md space-y-10">

//           {/* Heading */}
//           <div className="space-y-3 text-center lg:text-left">
//             <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
//               Get Started
//             </h2>
//             <p className="text-slate-500">
//               Create your account and start managing your tasks efficiently.
//             </p>
//           </div>

//           {/* Actions */}
//           <Card className="shadow-xl">
//             <CardHeader className="space-y-1">
//               <CardTitle>Create your workspace</CardTitle>
//               <CardDescription>
//                 Choose how you want to begin
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-4">
//               <Button asChild className="w-full text-base py-6">
//                 <Link to="/signup">Sign Up</Link>
//               </Button>

//               <Button asChild variant="outline" className="w-full py-6">
//                 <Link to="/login">Login</Link>
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Footer */}
//           <p className="text-sm text-slate-400 text-center">
//             No credit card required · Free forever
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default StartedPage

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rocket, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const StartedPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2">
      {/* BRAND HEADER - Fixed on all devices */}
      <header className="fixed top-0 left-0 right-0 lg:left-0 lg:right-auto lg:w-1/2 px-4 sm:px-6 lg:px-8 py-4 lg:py-6 flex justify-between items-center z-30 bg-gradient-to-b from-slate-900/95 to-transparent backdrop-blur-sm lg:backdrop-blur-none">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white">TaskPilot</h1>
        </div>

        {/* Desktop login hint */}
        <div className="hidden lg:flex items-center gap-2 text-sm text-slate-300">
          <span>Already have an account?</span>
          <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            <Link to='/login'>Login</Link>
          </button>
        </div>
      </header>

      {/* LEFT - HERO SECTION */}
      <div className="relative flex items-center justify-center bg-slate-900 overflow-hidden min-h-[50vh] sm:min-h-[55vh] lg:min-h-screen pt-16 lg:pt-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

        {/* Multiple gradient orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-full bg-blue-600/20 blur-[100px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[350px] lg:w-[450px] h-[250px] sm:h-[350px] lg:h-[450px] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Decorative stars */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        <div
          className="absolute top-32 right-16 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-24 left-20 w-2 h-2 bg-slate-400 rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Main illustration container */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-lg">
          {/* Illustration with enhanced styling */}
          <div className="relative mb-6 lg:mb-8">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent blur-3xl rounded-full" />
            <img
              src="https://illustrations.popsy.co/gray/product-launch.svg"
              alt="Launch your productivity"
              className="
                relative
                w-[280px] sm:w-[340px] md:w-[400px] lg:w-[480px]
                h-auto
                object-contain
                drop-shadow-[0_35px_70px_rgba(59,130,246,0.25)]
                animate-in fade-in zoom-in duration-700
              "
            />
          </div>

          {/* Hero text - hidden on mobile, shown on tablet/desktop */}
          <div
            className="hidden sm:block space-y-3 lg:space-y-4 animate-in slide-in-from-bottom duration-700"
            style={{ animationDelay: "200ms" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Launch your productivity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Everything you need
              <br />
              to stay organized
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Join thousands of teams managing their tasks efficiently with our
              intuitive platform
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT - FORM SECTION */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="w-full max-w-md space-y-6 sm:space-y-8 lg:space-y-10 animate-in slide-in-from-right duration-700">
          {/* Heading */}
          <div className="space-y-2 sm:space-y-3 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Get Started
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              Create your account and start managing your tasks efficiently
            </p>
          </div>

          {/* Main Card */}
          <Card className="shadow-2xl border-slate-200/60 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl sm:text-2xl">
                Create your workspace
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Choose how you want to begin
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 sm:space-y-4 pt-2">
              {/* Primary CTA */}
              <Button
                asChild
                className="w-full text-base sm:text-lg h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2"
                >
                  Sign Up
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or</span>
                </div>
              </div>

              {/* Secondary CTA */}
              <Button
                asChild
                variant="outline"
                className="w-full h-12 sm:h-14 text-base sm:text-lg border-2 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
              >
                <Link to="/login" className="flex items-center justify-center">
                  Login
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Trust badges */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-xs sm:text-sm text-slate-500 text-center font-medium">
              No credit card required · Free forever
            </p>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs sm:text-sm">Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs sm:text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-xs sm:text-sm">GDPR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartedPage;
