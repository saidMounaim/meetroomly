"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addRoomSchema } from "@/lib/validations";

import React from "react";

const AddRoomForm = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof addRoomSchema>>({
    resolver: zodResolver(addRoomSchema),
    defaultValues: {
      name: "",
      description: "",
      sqft: 0,
      capacity: 0,
      location: "",
      address: "",
      amenities: "",
      pricePerHour: 0,
      image: "",
    },
  });

  const { watch } = form;

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "image" && value.image?.[0]) {
        const file = value.image[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  function onSubmit(values: z.infer<typeof addRoomSchema>) {
    const filteredData = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => {
        if (typeof value === "string") return value.trim() !== "";
        if (typeof value === "number") return value !== 0;
        return true;
      })
    );
    console.log(filteredData);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter room name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter room description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="sqft"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Square Footage</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter room location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter room address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenities</FormLabel>
              <FormControl>
                <Input placeholder="Enter room amenities" {...field} />
              </FormControl>
              <FormDescription>
                Separate multiple amenities with commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pricePerHour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Per Hour</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Room Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    onChange(e.target.files);
                  }}
                  {...rest}
                />
              </FormControl>
              <FormDescription>
                Upload an image of the room (max 5MB, .jpg, .jpeg, .png, .webp)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {imagePreview && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Image Preview</h3>
            <Image
              src={imagePreview}
              alt="Room preview"
              width={300}
              height={200}
              className="object-cover rounded-md"
            />
          </div>
        )}
        <Button type="submit" className="w-full">
          Add Room
        </Button>
      </form>
    </Form>
  );
};

export default AddRoomForm;
