"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BlogListClient({ posts }: { posts: any[] }) {
  return (
    <div className="space-y-12">
      {posts.map((post, i) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group relative flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 group-hover:text-white transition-colors tracking-tight">
                {post.title}
              </h2>
            </Link>
            <p className="text-zinc-400 leading-relaxed text-base max-w-2xl">
              {post.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {post.tags.slice(0, 2).map((tag: string) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white transition-colors px-2.5 py-0.5 rounded-md text-xs font-medium"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 2 && (
              <span className="text-zinc-500 text-xs font-medium">+{post.tags.length - 2} more</span>
            )}
          </div>

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
              <Calendar size={14} />
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            
            <Link 
              href={`/blog/${post.slug}`}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-sm font-bold group/link"
            >
              Read more
              <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Separator line except for last item */}
          {i !== posts.length - 1 && (
            <div className="w-full h-px bg-zinc-900/50 mt-8"></div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
